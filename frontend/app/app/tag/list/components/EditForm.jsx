'use client'

import {useState} from 'react'
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

export default function EditForm({ tag }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {setTags} = useList();

    const {id, name, icon_path} = tag;

    const handleEdit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            name: formData.get("name"),
            icon_path: formData.get("icon"),
        }

        setError(null);
        setLoading(true);

        request(`tag/${id}`, "PUT", data)
            .then((result) => {
                setTags(prevData => prevData.map(tag => tag.id === id
                    ? {...tag, ...result}
                    : tag
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
                    <DialogTitle>Edit tag</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleEdit} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" type="text" defaultValue={name} required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="icon">Icon</Label>
                        <Input id="icon" name="icon" type="text" defaultValue={icon_path} required/>
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