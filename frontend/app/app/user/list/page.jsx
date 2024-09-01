'use client'

import {useState, useEffect} from 'react'
import { LoaderCircle } from 'lucide-react';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody, TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import TableItem from "@/app/user/list/components/TableItem";

import {request} from "@/utils/request";
import {ListProvider} from "@/app/user/list/context/ListContext";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(null);
        setLoading(true);

        request("user", "GET")
            .then((result) => {
                setUsers(result);
            })
            .catch((err) => {
                setError(err.error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <ListProvider value={{users, setUsers}}>
            <div className="grid place-items-center p-4">
                <Card className="mx-auto w-full max-w-6xl">
                    <CardHeader className="space-y-0 flex flex-row align-center justify-between p-6">
                        <CardTitle className="text-2xl">User list</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                        {error
                            ? <div className="text-center">{error}</div>
                            : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Id</TableHead>
                                            <TableHead>Nickname</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead>Created at</TableHead>
                                            <TableHead className="text-center">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {loading && <TableRow>
                                            <TableCell colSpan={6}>
                                                <LoaderCircle className="animate-spin mx-auto"/>
                                            </TableCell>
                                        </TableRow>}
                                        {users.map(user => <TableItem user={user} key={user.id} />)}
                                    </TableBody>
                                </Table>
                            )
                        }
                    </CardContent>
                </Card>
            </div>
        </ListProvider>
    )
}