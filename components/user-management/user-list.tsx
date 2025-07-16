"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    MoreHorizontal,
    Edit,
    Trash,
    ShieldAlert,
    ShieldCheck,
    Shield,
    UserCog,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useFetch } from "@/hooks/useFetch";
import { deleteRequest, generateErrorMessage } from "@/lib/utils";
import { toast } from "sonner";

// Mock user data
interface getUserProps {
    full_name: string;
    faculty: string;
    role: string;
    email: string;
    id: number;
    phone_no: number;
}
// Role icon mapping
const getRoleIcon = (role: string) => {
    switch (role) {
        case "SDC Chairman":
            return <ShieldAlert className="mr-2 h-4 w-4 text-sdc-blue" />;
        case "SDC Secretary":
            return <ShieldCheck className="mr-2 h-4 w-4 text-green-600" />;
        case "SDC Member":
            return <Shield className="mr-2 h-4 w-4 text-amber-600" />;
        default:
            return <UserCog className="mr-2 h-4 w-4 text-gray-600" />;
    }
};

interface UserListProps {
    onUserSelect: (userId: number) => void;
    searchQuery: string;
}

export function UserList({ onUserSelect, searchQuery }: UserListProps) {
    const {
        data: users,
        isLoading,
        isError,
    } = useFetch<getUserProps[]>("/get/user/");
    // Filter users based on search query
    const filteredUsers =
        users === null
            ? []
            : Array.isArray(users)
            ? users.filter((user) =>
                  user.full_name !== null
                      ? user.full_name
                      : "".toLowerCase().includes(searchQuery.toLowerCase()) ||
                        user.email
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                        user.role
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                        user.faculty
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
              )
            : [];

    async function handleDeleteUser(selectedId: number) {
        try {
            const deleteResponse = await deleteRequest(
                `/delete/user/${selectedId}/`,
                selectedId
            );
            if (deleteResponse) {
                toast.success(deleteResponse.message);
            }
        } catch (error) {
            const errorMessage = generateErrorMessage(error);
            toast.error(errorMessage);
        }
    }
    // async function handleUserDelete() {
    //   const response = await
    // }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                                Loading user's...
                            </TableCell>
                        </TableRow>
                    ) : filteredUsers.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                                NO user found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredUsers.map((user) => (
                            <TableRow
                                key={user.id}
                                className="cursor-pointer hover:bg-gray-50"
                                onClick={() => onUserSelect(user.id)}
                            >
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                                            <Image
                                                src={"/placeholder.svg"}
                                                alt={user.full_name || "User avatar"}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="font-medium">
                                                {user.full_name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                        {getRoleIcon(user.role)}
                                        {user.role}
                                    </div>
                                </TableCell>
                                <TableCell>{user.faculty}</TableCell>

                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="h-8 w-8 p-0"
                                            >
                                                <span className="sr-only">
                                                    Open menu
                                                </span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onUserSelect(user.id);
                                                }}
                                            >
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="text-red-600"
                                                onClick={() =>
                                                    handleDeleteUser(user.id)
                                                }
                                            >
                                                <Trash className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
