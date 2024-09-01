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
import TableItem from "./components/TableItem";
import AddForm from "@/app/role/list/components/AddForm";

import {request} from "@/utils/request";
import {ListProvider} from "./context/ListContext";

export default function UserList() {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(null);
        setLoading(true);

        request("role", "GET")
            .then((result) => {
                setRoles(result);
            })
            .catch((err) => {
                setError(err.error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <ListProvider value={{roles: roles, setRoles: setRoles}}>
            <div className="grid place-items-center p-4">
                <Card className="mx-auto w-full max-w-6xl">
                    <CardHeader className="space-y-0 flex flex-row align-center justify-between p-6">
                        <CardTitle className="text-2xl">Role list</CardTitle>
                        <AddForm/>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                        {error
                            ? <div className="text-center">{error}</div>
                            : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Id</TableHead>
                                            <TableHead>Name</TableHead>
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
                                        {roles.map(role => <TableItem role={role} key={role.id} />)}
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