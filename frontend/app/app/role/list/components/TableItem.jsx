'use client'

import { TableCell, TableRow } from "@/components/ui/table"
import EditForm from "./EditForm";
import DeleteDialog from "./DeleteDialog";

export default function TableItem({ role }) {
    const {id, name, created_at} = role;
    const createdAtDate = new Date(created_at);
    const createdAt = `${createdAtDate.toLocaleDateString()} ${createdAtDate.toLocaleTimeString()}`;

    return (
        <TableRow>
            <TableCell>{id}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{createdAt}</TableCell>
            <TableCell className="flex justify-center gap-1">
                <EditForm role={role}/>
                <DeleteDialog roleId={id}/>
            </TableCell>
        </TableRow>
    )
}