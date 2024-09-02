'use client'

import {useState} from 'react'
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

import {request} from "@/utils/request";
import {useList} from "@/context/ListContext";

export default function AddForm() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {setTags} = useList();

    const handleAdd = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            name: formData.get("name"),
            icon_path: formData.get("icon"),
        }

        setError(null);
        setLoading(true);

        request(`tag`, "POST", data)
            .then((result) => {
                setTags(prevData => [...prevData, result]);

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
                    <DialogTitle>Add tag</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAdd} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" type="text" required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="icon">Icon</Label>
                        <Input id="icon" name="icon" type="text" required/>
                    </div>
                    {error && <div className="text-sm text-red-500">{error}</div>}
                    <DialogFooter>
                        <Button disabled={loading} type="submit">Create tag</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}