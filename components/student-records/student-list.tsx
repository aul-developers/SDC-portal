"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, UserCircle, History, MoreHorizontal, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for students
const mockStudents = [
  {
    name: "Robert Chen",
    matricNumber: "STU-45789",
    department: "Computer Science",
    faculty: "Science and Technology",
    level: "300 Level",
    caseCount: 2,
    currentPunishment: "Academic Probation",
    status: "active",
    image: "/monogram-mb.png",
  },
  {
    name: "Jessica Lee",
    matricNumber: "STU-45123",
    department: "Business Administration",
    faculty: "Management Sciences",
    level: "400 Level",
    caseCount: 1,
    currentPunishment: "Academic Probation",
    status: "active",
    image: "/stylized-jl-logo.png",
  },
  {
    name: "Michael Brown",
    matricNumber: "STU-45678",
    department: "Electrical Engineering",
    faculty: "Engineering",
    level: "300 Level",
    caseCount: 1,
    currentPunishment: "Written Warning",
    status: "pending",
    image: "/monogram-mb.png",
  },
  {
    name: "David Wilson",
    matricNumber: "STU-42456",
    department: "Architecture",
    faculty: "Environmental Sciences",
    level: "400 Level",
    caseCount: 1,
    currentPunishment: "Restitution",
    status: "active",
    image: "/abstract-dw.png",
  },
  {
    name: "Sarah Johnson",
    matricNumber: "STU-41234",
    department: "Medicine",
    faculty: "Health Sciences",
    level: "500 Level",
    caseCount: 1,
    currentPunishment: null,
    status: "closed",
    image: "/stylized-letters-sj.png",
  },
  {
    name: "Emily Parker",
    matricNumber: "STU-45790",
    department: "Law",
    faculty: "Law",
    level: "400 Level",
    caseCount: 1,
    currentPunishment: "Grade Reduction",
    status: "pending",
    image: "/abstract-geometric-ep.png",
  },
  {
    name: "James Wilson",
    matricNumber: "STU-43456",
    department: "Psychology",
    faculty: "Social Sciences",
    level: "300 Level",
    caseCount: 1,
    currentPunishment: null,
    status: "closed",
    image: "/intertwined-letters.png",
  },
  {
    name: "Sophia Martinez",
    matricNumber: "STU-47890",
    department: "English Literature",
    faculty: "Arts and Humanities",
    level: "200 Level",
    caseCount: 1,
    currentPunishment: "Disciplinary Probation",
    status: "active",
    image: "/stylized-sm-logo.png",
  },
]

interface StudentListProps {
  onViewProfile: (matricNumber: string) => void
  onViewCaseHistory: (matricNumber: string) => void
}

export function StudentList({ onViewProfile, onViewCaseHistory }: StudentListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  // Get unique departments for filter
  const departments = Array.from(new Set(mockStudents.map((student) => student.department)))

  // Filter students based on search term and filters
  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch =
      searchTerm === "" ||
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.matricNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = departmentFilter === null || student.department === departmentFilter
    const matchesStatus = statusFilter === null || student.status === statusFilter

    return matchesSearch && matchesDepartment && matchesStatus
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, matric number, or department..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-10 gap-1">
              <Filter className="h-4 w-4" />
              {statusFilter ? `Status: ${statusFilter}` : "Filter by Status"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setStatusFilter(null)}>All Statuses</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("active")}>Active</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("closed")}>Closed</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-10 gap-1">
              <GraduationCap className="h-4 w-4" />
              {departmentFilter ? `Department: ${departmentFilter}` : "Filter by Department"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="max-h-[300px] overflow-y-auto">
            <DropdownMenuItem onClick={() => setDepartmentFilter(null)}>All Departments</DropdownMenuItem>
            {departments.map((department) => (
              <DropdownMenuItem key={department} onClick={() => setDepartmentFilter(department)}>
                {department}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead>Student</TableHead>
              <TableHead>Matric Number</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-center">Cases</TableHead>
              <TableHead>Current Punishment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No students found.
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow key={student.matricNumber} className="group hover:bg-muted/20">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-border">
                        <AvatarImage src={student.image || "/placeholder.svg"} alt={student.name} />
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sdc-navy">{student.name}</div>
                        <div className="text-xs text-sdc-gray">{student.level}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{student.matricNumber}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className={cn(
                        "rounded-full px-2.5 py-0.5 font-medium",
                        student.caseCount > 0 ? "bg-amber-50 text-amber-700" : "bg-gray-50 text-gray-500",
                      )}
                    >
                      {student.caseCount}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {student.currentPunishment ? (
                      <span className="text-sdc-navy">{student.currentPunishment}</span>
                    ) : (
                      <span className="text-muted-foreground">None</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        student.status === "active" && "bg-amber-500 hover:bg-amber-600",
                        student.status === "pending" && "bg-blue-500 hover:bg-blue-600",
                        student.status === "closed" && "bg-emerald-500 hover:bg-emerald-600",
                      )}
                    >
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewProfile(student.matricNumber)}>
                          <UserCircle className="mr-2 h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onViewCaseHistory(student.matricNumber)}>
                          <History className="mr-2 h-4 w-4" />
                          View Case History
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

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          Showing {filteredStudents.length} of {mockStudents.length} students
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
