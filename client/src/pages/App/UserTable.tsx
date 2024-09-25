import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setPageTitle } from '../.././store/themeConfigSlice';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '../../components/ui/dropdown-menu';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { SortingState, useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, flexRender, Row, ColumnFiltersState, getFilteredRowModel } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { EditUserProcess } from './user/EditUserProcess';
import { CreateUser } from './user/CreateUser';
import { DeleteUserDialog } from './user/DeleteUser';

type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    role: string;
};

export default function UserTable() {
    const dispatch = useDispatch();
    const [data, setData] = useState<User[]>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [searchQuery, setSearchQuery] = useState(''); // Add search query state
    // Pagination state
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

    useEffect(() => {
        dispatch(setPageTitle('Users Management'));
    }, []);

    useEffect(() => {
        axios
            .get('/api/fetchUsers')
            .then((response) => {
                setData(response.data.users);
            })
            .catch((error) => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

    const processedData = React.useMemo(() => {
        const filteredData = data.filter(
            (user) =>
                user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return filteredData.map((user, index) => ({ ...user, id: index + 1 }));
    }, [data, searchQuery]);

    const columns = React.useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
            },
            {
                id: 'name',
                header: 'Name',
                cell: ({ row }: { row: Row<User> }) => {
                    const firstName = row.original.firstName;
                    const lastName = row.original.lastName;
                    return `${firstName} ${lastName}`;
                },
            },
            {
                accessorKey: 'email',
                header: 'Email',
            },
            {
                accessorKey: 'createdAt',
                header: 'Created',
                cell: ({ row }: { row: Row<User> }) => {
                    const createdAt = new Date(row.original.createdAt);
                    const formattedDate = createdAt.toISOString().slice(2, 10).replace(/-/g, '/');
                    return formattedDate;
                },
            },
            {
                accessorKey: 'role',
                header: 'Role',
            },
            {
                id: 'actions',
                header: 'Actions',
                cell: ({ row }: { row: Row<User> }) => (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => console.log('Edit', row.original.id)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log('View', row.original.id)}>View</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => console.log('delete', row.original.id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
            },
        ],
        []
    );

    const table = useReactTable({
        data: processedData,
        columns,
        state: {
            sorting,
            rowSelection,
            columnFilters,
            pagination,
        },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        initialState: {
            pagination: { pageSize: 5 },
        },
    });

    return (
        <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
            <div className="invoice-table">
                <div className="mb-4.5 px-5 flex flex-col md:flex-row md:items-center gap-5">
                    <DeleteUserDialog />
                    <EditUserProcess />
                    <CreateUser />
                    <Input
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
                        className="max-w-auto"
                    />
                </div>
                <div className="px-5">
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id} className="font-bold text-black">
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id} className="font-semibold">
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
                    </div>
                    <div className="flex items-center justify-between py-4">
                        <span className="text-sm text-muted-foreground">
                            {pagination.pageIndex * pagination.pageSize + 1} - {Math.min((pagination.pageIndex + 1) * pagination.pageSize, processedData.length)} of {processedData.length} row(s)
                        </span>
                        <div className="space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPagination((prev) => ({ ...prev, pageIndex: Math.max(prev.pageIndex - 1, 0) }))}
                                disabled={pagination.pageIndex === 0}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPagination((prev) => ({ ...prev, pageIndex: Math.min(prev.pageIndex + 1, Math.ceil(processedData.length / pagination.pageSize) - 1) }))}
                                disabled={(pagination.pageIndex + 1) * pagination.pageSize >= processedData.length}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
