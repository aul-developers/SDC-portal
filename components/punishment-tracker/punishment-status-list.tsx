"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for punishments
const mockPunishments = [
  {
    id: "PUN-2024-001",
    student: {
      name: "Robert Chen",
      matricNumber: "STU-45789",
      image: "/monogram-mb.png",
    },
    caseId: "SDC-2024-091",
    type: "Academic Probation",
    startDate: "2024-05-15",
    endDate: "2024-09-15",
    status: "active",
    progress: 25,
    requirements: "Must attend academic integrity workshop and resubmit the paper.",
  },
  {
    id: "PUN-2024-002",
    student: {
      name: "Jessica Lee",
      matricNumber: "STU-45123",
      image: "/stylized-jl-logo.png",
    },
    caseId: "SDC-2024-088",
    type: "Academic Probation",
    startDate: "2024-05-07",
    endDate: "2024-09-07",
    status: "active",
    progress: 30,
    requirements: "Must maintain a GPA of 3.0 or higher and attend bi-weekly counseling sessions.",
  },
  {
    id: "PUN-2024-003",
    student: {
      name: "Michael Brown",
      matricNumber: "STU-45678",
      image: "/monogram-mb.png",
    },
    caseId: "SDC-2024-089",
    type: "Written Warning",
    startDate: "2024-05-08",
    endDate: "2024-05-08",
    status: "completed",
    progress: 100,
    requirements: "Formal written warning placed in student file.",
  },
  {
    id: "PUN-2024-004",
    student: {
      name: "David Wilson",
      matricNumber: "STU-42456",
      image: "/abstract-dw.png",
    },
    caseId: "SDC-2024-087",
    type: "Restitution",
    startDate: "2024-05-06",
    endDate: "2024-06-06",
    status: "active",
    progress: 50,
    requirements: "Must pay for damages to university property and complete 10 hours of community service.",
  },
  {
    id: "PUN-2024-005",
    student: {
      name: "Sarah Johnson",
      matricNumber: "STU-41234",
      image: "/stylized-letters-sj.png",
    },
    caseId: "SDC-2024-086",
    type: "Suspension",
    startDate: "2024-05-05",
    endDate: "2024-08-05",
    status: "active",
    progress: 35,
    requirements: "Suspended from all university activities for one semester.",
  },
  {
    id: "PUN-2024-006",
    student: {
      name: "Emily Parker",
      matricNumber: "STU-45790",
      image: "/abstract-geometric-ep.png",
    },
    caseId: "SDC-2024-085",
    type: "Grade Reduction",
    startDate: "2024-05-04",
    endDate: "2024-05-04",
    status: "completed",
    progress: 100,
    requirements: "Final grade in CSC301 reduced by one letter grade.",
  },
  {
    id: "PUN-2024-007",
    student: {
      name: "Sophia Martinez",
      matricNumber: "STU-47890",
      image: "/stylized-sm-logo.png",
    },
    caseId: "SDC-2024-084",
    type: "Disciplinary Probation",
    startDate: "2024-05-03",
    endDate: "2024-11-03",
    status: "active",
    progress: 15,
    requirements: "Must attend monthly meetings with academic advisor and maintain good standing.",
  },
  {
    id: "PUN-2024-008",
    student: {
      name: "James Wilson",
      matricNumber: "STU-43456",
      image: "/intertwined-letters.png",
    },
    caseId: "SDC-2024-090",
    type: "Community Service",
    startDate: "2024-05-09",
    endDate: "2024-06-09",
    status: "pending",
    progress: 0,
    requirements: "Must complete 20 hours of community service on campus.",
  },
]

interface PunishmentStatusListProps {
  status: "active" | "pending" | "completed"
  searchTerm: string
  onViewDetails: (punishmentId: string) => void
}

export function PunishmentStatusList({ status, searchTerm, onViewDetails }: PunishmentStatusListProps) {
  // Filter punishments based on status and search term
  const filteredPunishments = mockPunishments.filter((punishment) => {
    const matchesStatus = punishment.status === status
    const matchesSearch =
      searchTerm === "" ||
      punishment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      punishment.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      punishment.student.matricNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      punishment.type.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesStatus && matchesSearch
  })

  const handleMarkComplete = (punishmentId: string) => {
    // In a real application, this would call an API to update the punishment status
    alert(`Mark punishment ${punishmentId} as complete`)
  }

  // Custom title and empty state message based on status
  const getStatusTitle = () => {
    switch (status) {
      case "active":
        return "Active Punishments"
      case "pending":
        return "Pending Punishments"
      case "completed":
        return "Completed Punishments"
    }
  }

  const getEmptyStateMessage = () => {
    switch (status) {
      case "active":
        return "No active punishments found."
      case "pending":
        return "No pending punishments found."
      case "completed":
        return "No completed punishments found."
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-sdc-navy">{getStatusTitle()}</h3>

      <Card className="border-none shadow-sm overflow-hidden">
        <div className="rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead>Student</TableHead>
                <TableHead>Punishment ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Progress</TableHead>
                {status !== "completed" && <TableHead>Time Remaining</TableHead>}
                {status === "completed" && <TableHead>Completion Date</TableHead>}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPunishments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    {getEmptyStateMessage()}
                  </TableCell>
                </TableRow>
              ) : (
                filteredPunishments.map((punishment) => (
                  <TableRow key={punishment.id} className="group hover:bg-muted/20">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border border-border">
                          <AvatarImage
                            src={punishment.student.image || "/placeholder.svg"}
                            alt={punishment.student.name}
                          />
                          <AvatarFallback>
                            {punishment.student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sdc-navy">{punishment.student.name}</div>
                          <div className="text-xs text-sdc-gray">{punishment.student.matricNumber}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{punishment.id}</TableCell>
                    <TableCell>{punishment.type}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{new Date(punishment.startDate).toLocaleDateString()}</div>
                        <div className="text-muted-foreground">
                          to {new Date(punishment.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="w-full">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium">{punishment.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={cn(
                              "h-2 rounded-full",
                              punishment.status === "completed" ? "bg-emerald-500" : "bg-blue-500",
                            )}
                            style={{ width: `${punishment.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    {status !== "completed" && (
                      <TableCell>
                        {Math.ceil(
                          (new Date(punishment.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                        )}{" "}
                        days
                      </TableCell>
                    )}
                    {status === "completed" && (
                      <TableCell>{new Date(punishment.endDate).toLocaleDateString()}</TableCell>
                    )}
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
                              onClick={() => onViewDetails(punishment.id)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </button>
                          </DropdownMenuItem>
                          {status !== "completed" && (
                            <>
                              <DropdownMenuItem asChild>
                                <button
                                  className="flex w-full items-center cursor-pointer"
                                  onClick={() => handleMarkComplete(punishment.id)}
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Mark as Complete
                                </button>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <button
                                  className="flex w-full items-center cursor-pointer"
                                  onClick={() => onViewDetails(punishment.id)}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Update Progress
                                </button>
                              </DropdownMenuItem>
                            </>
                          )}
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

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          Showing {filteredPunishments.length} {status} punishments
        </div>
      </div>
    </div>
  )
}
