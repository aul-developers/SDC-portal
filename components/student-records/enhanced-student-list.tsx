"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Filter,
  UserCircle,
  History,
  GraduationCap,
  AlertTriangle,
  CheckCircle,
  Clock,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react"
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

interface EnhancedStudentListProps {
  onViewProfile: (matricNumber: string) => void
  onViewCaseHistory: (matricNumber: string) => void
}

export function EnhancedStudentList({ onViewProfile, onViewCaseHistory }: EnhancedStudentListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")

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

  // Status icon mapping
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "closed":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Enhanced search and filter bar */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, matric number, or department..."
                className="pl-9 h-10 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 gap-1 bg-white">
                    <GraduationCap className="h-4 w-4" />
                    <span className="max-w-[150px] truncate">
                      {departmentFilter ? `${departmentFilter}` : "Department"}
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 opacity-50" />
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

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 gap-1 bg-white">
                    <Filter className="h-4 w-4" />
                    <span>
                      {statusFilter ? `${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}` : "Status"}
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setStatusFilter(null)}>All Statuses</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("active")}>Active</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("closed")}>Closed</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex items-center gap-1 ml-auto">
                <Button
                  variant={viewMode === "table" ? "default" : "outline"}
                  size="icon"
                  className="h-10 w-10 bg-white text-sdc-navy"
                  onClick={() => setViewMode("table")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M3 15h18" />
                    <path d="M9 3v18" />
                    <path d="M15 3v18" />
                  </svg>
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  className="h-10 w-10 bg-white text-sdc-navy"
                  onClick={() => setViewMode("grid")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="7" height="7" x="3" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="14" rx="1" />
                    <rect width="7" height="7" x="3" y="14" rx="1" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {viewMode === "table" ? (
        <Card className="border-none shadow-sm overflow-hidden">
          <div className="rounded-md">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
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
                        <div className="flex items-center gap-1.5">
                          {getStatusIcon(student.status)}
                          <Badge
                            className={cn(
                              student.status === "active" && "bg-amber-500 hover:bg-amber-600",
                              student.status === "pending" && "bg-blue-500 hover:bg-blue-600",
                              student.status === "closed" && "bg-emerald-500 hover:bg-emerald-600",
                            )}
                          >
                            {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                          </Badge>
                        </div>
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
                            <DropdownMenuItem asChild>
                              <button
                                className="flex w-full items-center cursor-pointer"
                                onClick={() => onViewProfile(student.matricNumber)}
                              >
                                <UserCircle className="mr-2 h-4 w-4" />
                                View Profile
                              </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <button
                                className="flex w-full items-center cursor-pointer"
                                onClick={() => onViewCaseHistory(student.matricNumber)}
                              >
                                <History className="mr-2 h-4 w-4" />
                                View Case History
                              </button>
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
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredStudents.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">No students found.</div>
          ) : (
            filteredStudents.map((student) => (
              <Card
                key={student.matricNumber}
                className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
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
                          <div className="text-xs text-sdc-gray">{student.matricNumber}</div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
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
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">Department</p>
                        <p className="font-medium text-sdc-navy truncate">{student.department}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Level</p>
                        <p className="font-medium text-sdc-navy">{student.level}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Cases</p>
                        <p className="font-medium text-sdc-navy">{student.caseCount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Status</p>
                        <div className="flex items-center gap-1.5">
                          {getStatusIcon(student.status)}
                          <span className="font-medium text-sdc-navy capitalize">{student.status}</span>
                        </div>
                      </div>
                    </div>

                    {student.currentPunishment && (
                      <div className="mt-3 rounded-md bg-amber-50 p-2 text-xs">
                        <p className="font-medium text-amber-800">Current Punishment:</p>
                        <p className="text-amber-700">{student.currentPunishment}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

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
