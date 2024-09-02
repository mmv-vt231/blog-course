'use client'

import { X, Check } from 'lucide-react';

import { TableCell, TableRow } from "@/components/ui/table"
import EditForm from "./EditForm";
import DeleteDialog from "./DeleteDialog";
import {Badge} from "@/components/ui/badge";

import {toFirstUpperCase} from "@/utils/toFirstUpperCase";

export default function TableItem({ post }) {
    const {id, title, content, tag, short_description, is_private, created_at} = post;
    const createdAtDate = new Date(created_at);
    const createdAt = `${createdAtDate.toLocaleDateString()} ${createdAtDate.toLocaleTimeString()}`;
    const tagName = tag ? toFirstUpperCase(tag.name) : "";

    return (
        <TableRow>
            <TableCell>{id}</TableCell>
            <TableCell>{title}</TableCell>
            <TableCell>{content}</TableCell>
            <TableCell>
                {tag && <Badge variant="secondary">{tagName}</Badge>}
            </TableCell>
            <TableCell>{short_description}</TableCell>
            <TableCell>{is_private ? <Check/> : <X/>}</TableCell>
            <TableCell>{createdAt}</TableCell>
            <TableCell className="flex justify-center gap-1">
                <EditForm post={post}/>
                <DeleteDialog postId={id}/>
            </TableCell>
        </TableRow>
    )
}