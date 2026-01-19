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
import { UserAvatar } from "@/components/common/user-avatar";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { deleteRequest, generateErrorMessage } from "@/lib/utils";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { getUsers, deleteUser } from "@/actions/user-management";

// Mock user data
interface getUserProps {
  full_name: string;
  role: string;
  email: string;
  id: number;
  phone_no: number;
}
// Role icon mapping
const getRoleIcon = (role: string) => {
  switch (role) {
    case "SDC Chairman":
    case "super_admin":
      return <ShieldAlert className="mr-2 h-4 w-4 text-sdc-blue" />;
    case "SDC Secretary":
    case "board_member":
      return <ShieldCheck className="mr-2 h-4 w-4 text-green-600" />;
    case "SDC Member":
    case "viewer":
      return <Shield className="mr-2 h-4 w-4 text-amber-600" />;
    default:
      return <UserCog className="mr-2 h-4 w-4 text-gray-600" />;
  }
};

interface UserListProps {
  onUserSelect: (userId: string) => void;
  searchQuery: string;
  refreshTrigger: number;
}

export function UserList({
  onUserSelect,
  searchQuery,
  refreshTrigger,
}: UserListProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsers();
        setUsers(data || []);
      } catch (error: any) {
        toast.error("Failed to fetch users", {
          description: error.message || "Check console for details",
        });
      }
      setIsLoading(false);
    }
    fetchUsers();
  }, [refreshTrigger]);
  // Filter users based on search query
  const filteredUsers =
    users === null
      ? []
      : Array.isArray(users)
        ? users.filter((user) => {
            const lowerQuery = searchQuery.toLowerCase();
            const fullName = user.full_name?.toLowerCase() || "";
            const email = user.email?.toLowerCase() || "";
            const role = user.role?.toLowerCase() || "";

            return (
              fullName.includes(lowerQuery) ||
              email.includes(lowerQuery) ||
              role.includes(lowerQuery)
            );
          })
        : [];

  async function handleDeleteUser(selectedId: any) {
    // Use Server Action for secure deletion and auditing
    const result = await deleteUser(selectedId);

    if (result.success) {
      toast.success(result.message);
      setUsers(users.filter((u) => u.id !== selectedId));
    } else {
      toast.error("Failed to delete user", {
        description: result.message,
      });
    }
  }
  // async function handleUserDelete() {
  //   const response = await
  // }

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            // Loading Skeleton
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-8 rounded-md" />
                </TableCell>
              </TableRow>
            ))
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
                className="cursor-pointer"
                onClick={() => onUserSelect(user.id)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <UserAvatar
                      name={user.full_name || "User"}
                      avatarUrl={user.avatar_url}
                      className="h-10 w-10"
                    />
                    <div>
                      <div className="font-medium">{user.full_name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {getRoleIcon(user.role)}
                    {user.role}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-emerald-50 text-emerald-600 border-0"
                  >
                    Active
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {user.last_sign_in_at
                    ? new Date(user.last_sign_in_at).toLocaleDateString()
                    : "N/A"}
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
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
                        onClick={() => handleDeleteUser(user.id)}
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
