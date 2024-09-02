'use client'

import {useState, useEffect} from 'react'
import { Pencil } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

import {request} from "@/utils/request";
import {useList} from "@/context/ListContext";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {toFirstUpperCase} from "@/utils/toFirstUpperCase";
import {Switch} from "@/components/ui/switch";

export default function EditForm({ post }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tags, setTags] = useState([]);

    const {setPosts} = useList();

    const {id, title, content, tag, short_description, is_private} = post;

    useEffect(() => {
        request("tag", "GET")
            .then((result) => {
                setTags(result);
            })
    }, []);

    const handleEdit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            title: formData.get("title"),
            content: formData.get("content"),
            tag: formData.get("tag"),
            short_description: formData.get("short_description"),
            is_private: formData.get("is_private"),
        }

        setError(null);
        setLoading(true);

        request(`post/${id}`, "PUT", data)
            .then((result) => {
                setPosts(prevData => prevData.map(post => post.id === id
                    ? {...post, ...result}
                    : post
                ));

                setOpen(false);
            })
            .catch((err) => {
                setError(err.error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="h-8 w-8 p-0 hover:bg-gray-100" variant="ghost">
                    <Pencil className="w-4 h-4"/>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit post</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleEdit} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" defaultValue={title} type="text" required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="short_description">Short description</Label>
                        <Input id="short_description" name="short_description" defaultValue={short_description} type="text" required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea id="content" name="content" defaultValue={content} type="text" required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="tag">Tag</Label>
                        <Select name="tag" defaultValue={tag?.id}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select tag"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {tags.map(({id, name}) => (
                                        <SelectItem key={id} value={id}>{toFirstUpperCase(name)}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="private">Private</Label>
                        <Switch id="private" defaultChecked={is_private} name="private"/>
                    </div>
                    {error && <div className="text-sm text-red-500">{error}</div>}
                    <DialogFooter>
                        <Button disabled={loading} type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}