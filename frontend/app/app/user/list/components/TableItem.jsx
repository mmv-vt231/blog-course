'use client'

import { TableCell, TableRow } from "@/components/ui/table"
import EditForm from "@/app/user/list/components/EditForm";
import DeleteDialog from "@/app/user/list/components/DeleteDialog";
import { Badge } from "@/components/ui/badge"

import {toFirstUpperCase} from "@/utils/toFirstUpperCase";

export default function TableItem({ user }) {
    const {id, nickname, email, role, created_at} = user;
    const createdAtDate = new Date(created_at);
    const createdAt = `${createdAtDate.toLocaleDateString()} ${createdAtDate.toLocaleTimeString()}`;
    const roleName = toFirstUpperCase(role.name);

    return (
        <TableRow>
            <TableCell>{id}</TableCell>
            <TableCell>{nickname}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>
                <Badge variant="secondary">{roleName}</Badge>
            </TableCell>
            <TableCell>{createdAt}</TableCell>
            <TableCell className="flex justify-center gap-1">
                <EditForm user={user}/>
                <DeleteDialog userId={id}/>
            </TableCell>
        </TableRow>
    )
}