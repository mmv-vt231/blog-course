'use client'

import {useState} from 'react'
import { Trash2 } from "lucide-react"

import {
    Dialog,
    DialogContent, DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";

import {request} from "@/utils/request";
import {useList} from "../context/ListContext";

export default function DeleteDialog({ roleId }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const {setRoles} = useList();

    const handleDelete = () => {
        setLoading(true);

        request(`role/${roleId}`, "DELETE")
            .then(() => {
                setRoles(prevData => prevData.filter(role => role.id !== roleId));

                setOpen(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="h-8 w-8 p-0 hover:bg-red-100" variant="ghost">
                    <Trash2 className="w-4 h-4 text-red-500"/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm</DialogTitle>
                    <DialogDescription>Are you sure you want to delete this role?</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={handleDelete} disabled={loading} type="submit">Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}