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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

import {request} from "@/utils/request";
import {useList} from "@/context/ListContext";
import {toFirstUpperCase} from "@/utils/toFirstUpperCase";

export default function EditForm({ user }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [roles, setRoles] = useState([]);

    const {setUsers} = useList();

    const {id, nickname, email, role} = user;

    useEffect(() => {
        request("role", "GET")
            .then((result) => {
                setRoles(result);
            })
    }, []);

    const handleEdit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            email: formData.get("email"),
            nickname: formData.get("nickname"),
            role_id: formData.get("role")
        }

        setError(null);
        setLoading(true);

        request(`user/${id}`, "PUT", data)
            .then((result) => {
                setUsers(prevData => prevData.map(user => user.id === result.id
                    ? {...user, ...result}
                    : user
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
                    <DialogTitle>Edit user</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleEdit} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" defaultValue={email} required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="nickname">Nickname</Label>
                        <Input id="nickname" name="nickname" type="text" defaultValue={nickname} required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="role">Roles</Label>
                        <Select name="role" defaultValue={role?.id}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {roles.map(({id, name}) => (
                                        <SelectItem key={id} value={id}>{toFirstUpperCase(name)}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
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