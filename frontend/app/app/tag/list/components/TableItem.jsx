'use client'

import { TableCell, TableRow } from "@/components/ui/table"
import EditForm from "./EditForm";
import DeleteDialog from "./DeleteDialog";

export default function TableItem({ tag }) {
    const {id, name, icon_path} = tag;

    return (
        <TableRow>
            <TableCell>{id}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>
                <img
                    width={50}
                    height={50}
                    src={icon_path}
                    alt="Tag icon"/>
            </TableCell>
            <TableCell className="flex justify-center gap-1">
                <EditForm tag={tag}/>
                <DeleteDialog tagId={id}/>
            </TableCell>
        </TableRow>
    )
}