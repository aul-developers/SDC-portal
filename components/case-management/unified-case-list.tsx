"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Eye, Edit, Trash2, Filter, Users, User } from "lucide-react"
import { cn } from "@/lib/utils"

// Combined mock data for both individual and grouped cases
const mockUnifiedCases = [
  // Individual cases
  {
    id: "SDC-091",
    type: "individual" as const,
    title: "Robert Chen - Academic Dishonesty",
    student: "Robert Chen",
    matricNumber: "STU-45789",
    students: [{ name: "Robert Chen", matricNumber: "STU-45789", image: "/monogram-mb.png" }],
    offence: "Academic Dishonesty",
    punishment: "Academic Probation",
    status: "pending",
    date: "2024-05-10",
    priority: "medium",
  },
  {
    id: "GRP-2024-001",
    type: "grouped" as const,
    title: "Academic Dishonesty - Group Assignment",
    description: "Collaborative cheating in CSC301 final project",
    students: [
      { name: "Jessica Lee", matricNumber: "STU-45123", image: "/stylized-jl-logo.png" },
      { name: "Michael Brown", matricNumber: "STU-45678", image: "/monogram-mb.png" },
      { name: "David Wilson", matricNumber: "STU-42456", image: "/abstract-dw.png" },
    ],
    offence: "Academic Dishonesty",
    punishment: "Academic Probation",
    status: "pending",
    date: "2024-05-10",
    priority: "high",
  },
  {
    id: "SDC-2024-090",
    type: "individual" as const,
    title: "James Wilson - Behavioral Misconduct",
    student: "James Wilson",
    matricNumber: "STU-43456",
    students: [{ name: "James Wilson", matricNumber: "STU-43456", image: "/intertwined-letters.png" }],
    offence: "Behavioral Misconduct",
    punishment: "Community Service",
    status: "scheduled",
    date: "2024-05-09",
    priority: "low",
  },
  {
    id: "GRP-2024-002",
    type: "grouped" as const,
    title: "Dormitory Disturbance",
    description: "Noise complaints and property damage in Block A",
    students: [
      { name: "Emily Parker", matricNumber: "STU-45789", image: "/abstract-geometric-ep.png" },
      { name: "Sophia Martinez", matricNumber: "STU-47890", image: "/stylized-sm-logo.png" },
    ],
    offence: "Behavioral Misconduct",
    punishment: "Disciplinary Probation",
    status: "in-progress",
    date: "2024-05-08",
    priority: "medium",
  },
  {
    id: "SDC-2024-089",
    type: "individual" as const,
    title: "Sarah Johnson - Substance Violation",
    student: "Sarah Johnson",
    matricNumber: "STU-41234",
    students: [{ name: "Sarah Johnson", matricNumber: "STU-41234", image: "/stylized-letters-sj.png" }],
    offence: "Substance Violation",
    punishment: "Suspension",
    status: "resolved",
    date: "2024-05-05",
    priority: "high",
  },
  {
    id: "GRP-2024-003",
    type: "grouped" as const,
    title: "Examination Misconduct",
    description: "Coordinated cheating during midterm examination",
    students: [
      { name: "Robert Chen", matricNumber: "STU-45789", image: "/monogram-mb.png" },
      { name: "Jessica Lee", matricNumber: "STU-45123", image: "/stylized-jl-logo.png" },
      { name: "Michael Brown", matricNumber: "STU-45678", image: "/monogram-mb.png" },
      { name: "Emily Parker", matricNumber: "STU-45789", image: "/abstract-geometric-ep.png" },
    ],
    offence: "Academic Dishonesty",
    punishment: "Grade Reduction",
    status: "scheduled",
    date: "2024-05-06",
    priority: "high",
  },
]

interface UnifiedCaseListProps {
  onViewDetails: (caseId: string, type: "individual" | "grouped") => void
}

export function UnifiedCaseList({ onViewDetails }: UnifiedCaseListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [typeFilter, setTypeFilter] = useState<string | null>(null)

  // Filter cases based on search term, status filter, and type filter
  const filteredCases = mockUnifiedCases.filter((caseItem) => {
    const matchesSearch =
      searchTerm === "" ||
      caseItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.offence.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.students.some(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.matricNumber.toLowerCase().includes(searchTerm.toLowerCase()),
      )

    const matchesStatus = statusFilter === null || caseItem.status === statusFilter
    const matchesType = typeFilter === null || caseItem.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const handleDelete = (caseId: string, type: string) => {
    alert(`Delete ${type} case ${caseId}`)
  }

  const handleEdit = (caseId: string, type: string) => {
    alert(`Edit ${type} case ${caseId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by case ID, title, student name, or offence..."
            className="pl-10 h-11"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-11 px-4 gap-2 min-w-[140px]">
              <Filter className="h-4 w-4" />
              {typeFilter ? `Type: ${typeFilter}` : "All Types"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => setTypeFilter(null)}>All Types</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTypeFilter("individual")}>Individual</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTypeFilter("grouped")}>Grouped</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-11 px-4 gap-2 min-w-[160px]">
              <Filter className="h-4 w-4" />
              {statusFilter ? `Status: ${statusFilter}` : "All Statuses"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => setStatusFilter(null)}>All Statuses</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("scheduled")}>Scheduled</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("in-progress")}>In Progress</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("resolved")}>Resolved</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-lg border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="h-12 px-6 font-medium">Case ID</TableHead>
              <TableHead className="h-12 px-6 font-medium">Type</TableHead>
              <TableHead className="h-12 px-6 font-medium">Title</TableHead>
              <TableHead className="h-12 px-6 font-medium">Students</TableHead>
              <TableHead className="h-12 px-6 font-medium">Offence</TableHead>
              <TableHead className="h-12 px-6 font-medium">Status</TableHead>
              <TableHead className="h-12 px-6 font-medium">Priority</TableHead>
              <TableHead className="h-12 px-6 font-medium">Date</TableHead>
              <TableHead className="h-12 px-6 text-right font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCases.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-32 text-center text-muted-foreground">
                  No cases found.
                </TableCell>
              </TableRow>
            ) : (
              filteredCases.map((caseItem) => (
                <TableRow key={caseItem.id} className="hover:bg-gray-50/50">
                  <TableCell className="px-6 py-4 font-medium">{caseItem.id}</TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge variant="outline" className="gap-1">
                      {caseItem.type === "individual" ? <User className="h-3 w-3" /> : <Users className="h-3 w-3" />}
                      {caseItem.type.charAt(0).toUpperCase() + caseItem.type.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 max-w-xs">
                    <p className="font-medium text-sm truncate">{caseItem.title}</p>
                    {caseItem.type === "grouped" && "description" in caseItem && (
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{caseItem.description}</p>
                    )}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex -space-x-2">
                        {caseItem.students.slice(0, 3).map((student, index) => (
                          <Avatar key={index} className="h-8 w-8 border-2 border-background">
                            <AvatarImage src={student.image || "/placeholder.svg"} alt={student.name} />
                            <AvatarFallback className="text-xs">
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <div>
                        <span className="text-xs font-medium">{caseItem.students.length}</span>
                        {caseItem.students.length > 3 && (
                          <span className="text-xs text-muted-foreground ml-1">(+{caseItem.students.length - 3})</span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">{caseItem.offence}</TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge
                      className={cn(
                        "px-3 py-1",
                        caseItem.status === "pending" && "bg-amber-500 hover:bg-amber-600",
                        caseItem.status === "scheduled" && "bg-blue-500 hover:bg-blue-600",
                        caseItem.status === "in-progress" && "bg-indigo-500 hover:bg-indigo-600",
                        caseItem.status === "resolved" && "bg-emerald-500 hover:bg-emerald-600",
                      )}
                    >
                      {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge
                      variant="outline"
                      className={cn(
                        "px-3 py-1",
                        caseItem.priority === "high" && "border-red-200 text-red-700 bg-red-50",
                        caseItem.priority === "medium" && "border-amber-200 text-amber-700 bg-amber-50",
                        caseItem.priority === "low" && "border-green-200 text-green-700 bg-green-50",
                      )}
                    >
                      {caseItem.priority.charAt(0).toUpperCase() + caseItem.priority.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4">{new Date(caseItem.date).toLocaleDateString()}</TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem asChild>
                          <button
                            className="flex w-full items-center cursor-pointer"
                            onClick={() => onViewDetails(caseItem.id, caseItem.type)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <button
                            className="flex w-full items-center cursor-pointer"
                            onClick={() => handleEdit(caseItem.id, caseItem.type)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Case
                          </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="text-red-600 focus:text-red-600">
                          <button
                            className="flex w-full items-center cursor-pointer"
                            onClick={() => handleDelete(caseItem.id, caseItem.type)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Case
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
    </div>
  )
}
