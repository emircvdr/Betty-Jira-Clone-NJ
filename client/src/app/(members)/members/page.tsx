"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

export type Invite = {
    id: number
    invitedEmail: string
    status: "Accepted" | "Pending"
}

export const columns: ColumnDef<Invite>[] = [
    {
        accessorKey: "invitedEmail",
        header: "Email",
        cell: ({ row }) => <div className="lowercase">{row.getValue("invitedEmail")}</div>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
    },
    {
        id: "actions",
        cell: () => (
            <Button variant="destructive" size="sm">
                Remove
            </Button>
        ),
    },
]

const Members = () => {
    const [data, setData] = useState<Invite[]>([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const userId = Cookies.get("user")

    useEffect(() => {
        const token = Cookies.get("token");
        const userId = Cookies.get("user");
        const workplace = Cookies.get("workplace");

        const fetchInvites = async () => {
            try {
                const response = await fetch(`http://localhost:5135/api/WorkplaceInvite/getInvitesByUser/${userId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Veri alınırken bir hata oluştu");
                }
                const data = await response.json();
                const filteredData = data.filter((x) => x.workplaceId == workplace);
                setData(filteredData);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchAccounts = async () => {
            try {
                const response = await fetch(`http://localhost:5135/api/Auth/GetList`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Veri alınırken bir hata oluştu");
                }
                const users = await response.json();
                setUsers(users);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAccounts();
        fetchInvites();
    }, []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const handleSendInvite = async () => {
        const token = Cookies.get("token");
        const userId = Cookies.get("user");
        const workplace = Cookies.get("workplace");
        const invitedUserId = users.find((item) => item.email === selectedUser).id;

        try {
            const response = await fetch("http://localhost:5135/api/WorkplaceInvite/sendInvite", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    workplaceId: workplace,
                    invitedId: invitedUserId,
                    invitedEmail: selectedUser,
                    invitedByUserId: userId,
                }),
            });

            if (!response.ok) {
                throw new Error("İşlem sırasında bir hata oluştu");
            }
            const data = await response.json();
            setData([...data]);
        } catch (error) {
            console.error(error
            );
        }

    };

    return (
        <div className="w-full h-full p-6">
            <div className="flex flex-col">
                <h1 className="black">Members</h1>
                <div className="text-muted-foreground">
                    Type an email address to invite a new member to your workspace.
                </div>
            </div>
            <div className="mt-5">
                <Card>
                    <CardContent className="w-full h-full flex flex-col">
                        <div className="flex p-4 items-center gap-3">
                            <div className="flex flex-col space-y-1.5 w-4/5">
                                <Select onValueChange={
                                    (value) => {
                                        setSelectedUser(value);
                                    }
                                }>
                                    <SelectTrigger className="w-full h-10">
                                        <SelectValue placeholder="Select a Account" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Accounts</SelectLabel>
                                            {
                                                users.filter((x) => x.id != userId).map((item) => (
                                                    <SelectItem key={item.id} value={item.email}>
                                                        {item.username} - {item.email}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button size="lg" className="w-1/5" onClick={handleSendInvite}>Invite Users</Button>
                        </div>
                        <div className="p-4 pt-0">
                            <div className="w-full">
                                <Table>
                                    <TableHeader>
                                        {table.getHeaderGroups().map((headerGroup) => (
                                            <TableRow key={headerGroup.id}>
                                                {headerGroup.headers.map((header) => (
                                                    <TableHead key={header.id}>
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                    </TableHead>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableHeader>
                                    <TableBody>
                                        {table.getRowModel().rows.length ? (
                                            table.getRowModel().rows.map((row) => (
                                                <TableRow key={row.id}>
                                                    {row.getVisibleCells().map((cell) => (
                                                        <TableCell key={cell.id}>
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                                    No results.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                                <div className="flex items-center justify-end space-x-2 py-4">
                                    <div className="flex-1 text-sm text-muted-foreground">
                                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                                        {table.getFilteredRowModel().rows.length} row(s) selected.
                                    </div>
                                    <div className="space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => table.previousPage()}
                                            disabled={!table.getCanPreviousPage()}
                                        >
                                            Previous
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => table.nextPage()}
                                            disabled={!table.getCanNextPage()}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Members;
