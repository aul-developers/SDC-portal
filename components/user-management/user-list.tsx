"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Edit, Trash, ShieldAlert, ShieldCheck, Shield, UserCog } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Mock user data
const users = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@university.edu",
    role: "SDC Chairman",
    department: "Faculty of Law",
    status: "active",
    lastActive: "2 hours ago",
    avatar: "/diverse-user-avatars.png",
  },
  {
    id: "2",
    name: "Prof. Michael Brown",
    email: "m.brown@university.edu",
    role: "SDC Member",
    department: "Faculty of Social Sciences",
    status: "active",
    lastActive: "1 day ago",
    avatar: "/monogram-mb.png",
  },
  {
    id: "3",
    name: "Dr. James Lee",
    email: "j.lee@university.edu",
    role: "SDC Secretary",
    department: "Faculty of Education",
    status: "active",
    lastActive: "3 hours ago",
    avatar: "/stylized-jl-logo.png",
  },
  {
    id: "4",
    name: "Prof. David Wilson",
    email: "d.wilson@university.edu",
    role: "SDC Member",
    department: "Faculty of Science",
    status: "inactive",
    lastActive: "2 weeks ago",
    avatar: "/abstract-dw.png",
  },
  {
    id: "5",
    name: "Dr. Susan Jones",
    email: "s.jones@university.edu",
    role: "SDC Member",
    department: "Faculty of Arts",
    status: "active",
    lastActive: "5 hours ago",
    avatar: "/stylized-letters-sj.png",
  },
  {
    id: "6",
    name: "Prof. Elizabeth Parker",
    email: "e.parker@university.edu",
    role: "SDC Member",
    department: "Faculty of Engineering",
    status: "active",
    lastActive: "Yesterday",
    avatar: "/abstract-geometric-ep.png",
  },
  {
    id: "7",
    name: "Dr. Samuel Miller",
    email: "s.miller@university.edu",
    role: "SDC Member",
    department: "Faculty of Medicine",
    status: "active",
    lastActive: "4 days ago",
    avatar: "/stylized-sm-logo.png",
  },
]

// Role icon mapping
const getRoleIcon = (role: string) => {
  switch (role) {
    case "SDC Chairman":
      return <ShieldAlert className="mr-2 h-4 w-4 text-sdc-blue" />
    case "SDC Secretary":
      return <ShieldCheck className="mr-2 h-4 w-4 text-green-600" />
    case "SDC Member":
      return <Shield className="mr-2 h-4 w-4 text-amber-600" />
    default:
      return <UserCog className="mr-2 h-4 w-4 text-gray-600" />
  }
}

interface UserListProps {
  onUserSelect: (userId: string) => void
  searchQuery: string
}

export function UserList({ onUserSelect, searchQuery }: UserListProps) {
  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
          {filteredUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            filteredUsers.map((user) => (
              <TableRow key={user.id} className="cursor-pointer hover:bg-gray-50" onClick={() => onUserSelect(user.id)}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
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
                <TableCell>{user.department}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${
                      user.status === "active"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-500 bg-gray-50 text-gray-700"
                    }`}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.lastActive}</TableCell>
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
                          e.stopPropagation()
                          onUserSelect(user.id)
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={(e) => e.stopPropagation()}>
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
  )
}
