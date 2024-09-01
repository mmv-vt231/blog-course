'use client'

import {useState, useEffect} from 'react'
import { Plus } from "lucide-react"

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
import {Textarea} from "@/components/ui/textarea";
import {Switch} from "@/components/ui/switch";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

import {request} from "@/utils/request";
import {useList} from "@/context/ListContext";
import {toFirstUpperCase} from "@/utils/toFirstUpperCase";

export default function AddForm() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tags, setTags] = useState([]);

    const {setPosts} = useList();

    useEffect(() => {
        request("tag", "GET")
            .then((result) => {
                setTags(result);
            })
    }, []);

    const handleAdd = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            title: formData.get("title"),
            content: formData.get("content"),
            tag_id: formData.get("tag"),
            short_description: formData.get("short_description"),
            is_private: !!formData.get("is_private"),
        }

        setError(null);
        setLoading(true);

        request(`post`, "POST", data)
            .then((result) => {
                setPosts(prevData => [...prevData, result]);

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
                <Button>
                    <Plus className="w-4 h-4 mr-2"/> Add
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add post</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAdd} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" type="text" required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="short_description">Short description</Label>
                        <Input id="short_description" name="short_description" type="text" required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea id="content" name="content" type="text" required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="tag">Tag</Label>
                        <Select name="tag">
                            <SelectTrigger>
                                <SelectValue placeholder="Select tag" />
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
                        <Label htmlFor="is_private">Private</Label>
                        <Switch id="is_private" name="is_private" />
                    </div>
                    {error && <div className="text-sm text-red-500">{error}</div>}
                    <DialogFooter>
                        <Button disabled={loading} type="submit">Create post</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}