"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  User,
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  AlertTriangle,
  Edit,
  FileCheck,
  MessageSquare,
} from "lucide-react"

// Mock punishment data
const mockPunishmentDetails = {
  id: "PUN-2024-001",
  student: {
    name: "Robert Chen",
    matricNumber: "STU-45789",
    department: "Computer Science",
    level: "300 Level",
    image: "/monogram-mb.png",
  },
  case: {
    id: "SDC-2024-091",
    offence: "Academic Dishonesty",
    description: "Plagiarism detected in final term paper for CSC301 - Software Engineering.",
  },
  type: "Academic Probation",
  duration: "1 Semester",
  startDate: "2024-05-15",
  endDate: "2024-09-15",
  status: "active",
  progress: 25,
  requirements: "Must attend academic integrity workshop and resubmit the paper.",
  verificationRequired: true,
  verificationStatus: "pending",
  notes: "Student has shown remorse and willingness to comply with the requirements.",
  milestones: [
    {
      id: "MS-001",
      title: "Academic Integrity Workshop",
      dueDate: "2024-06-15",
      status: "completed",
      completedDate: "2024-06-10",
      verifiedBy: "Dr. Sarah Johnson",
    },
    {
      id: "MS-002",
      title: "Resubmit Paper",
      dueDate: "2024-07-15",
      status: "pending",
      completedDate: null,
      verifiedBy: null,
    },
    {
      id: "MS-003",
      title: "Mid-term Review",
      dueDate: "2024-07-30",
      status: "pending",
      completedDate: null,
      verifiedBy: null,
    },
    {
      id: "MS-004",
      title: "Final Review",
      dueDate: "2024-09-10",
      status: "pending",
      completedDate: null,
      verifiedBy: null,
    },
  ],
  history: [
    {
      date: "2024-05-15",
      action: "Punishment Started",
      user: "Dr. Sarah Johnson",
      notes: "Academic probation initiated as per committee decision.",
    },
    {
      date: "2024-06-10",
      action: "Milestone Completed",
      user: "Dr. Sarah Johnson",
      notes: "Student completed the Academic Integrity Workshop.",
    },
    {
      date: "2024-06-12",
      action: "Progress Update",
      user: "Admin Assistant",
      notes: "Progress updated to 25%.",
    },
  ],
}

interface PunishmentDetailsProps {
  punishmentId: string
  onUpdatePunishment: (punishmentId: string) => void
}

export function PunishmentDetails({ punishmentId, onUpdatePunishment }: PunishmentDetailsProps) {
  // In a real application, you would fetch the punishment details based on the punishmentId
  // For this example, we'll use the mock data
  const punishment = mockPunishmentDetails

  return (
    <div className="space-y-6">
      {/* Punishment Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-border">
            <AvatarImage src={punishment.student.image || "/placeholder.svg"} alt={punishment.student.name} />
            <AvatarFallback className="text-lg">
              {punishment.student.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-sdc-navy">{punishment.student.name}</h2>
              <Badge variant="outline" className="ml-2">
                {punishment.student.matricNumber}
              </Badge>
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-sdc-gray">
              <User className="h-4 w-4" />
              <span>
                {punishment.student.department}, {punishment.student.level}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-sdc-gray">
              <FileText className="h-4 w-4" />
              <span>
                Case #{punishment.case.id} - {punishment.case.offence}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 md:items-end">
          <div className="flex items-center gap-2">
            <Badge
              className={cn(
                punishment.status === "active" && "bg-amber-500 hover:bg-amber-600",
                punishment.status === "pending" && "bg-blue-500 hover:bg-blue-600",
                punishment.status === "completed" && "bg-emerald-500 hover:bg-emerald-600",
              )}
            >
              {punishment.status.charAt(0).toUpperCase() + punishment.status.slice(1)}
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {punishment.id}
            </Badge>
          </div>
          <Button variant="outline" size="sm" className="gap-1" onClick={() => onUpdatePunishment(punishment.id)}>
            <Edit className="h-4 w-4" />
            Update Status
          </Button>
        </div>
      </div>

      <Separator />

      {/* Punishment Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Punishment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-500" />
              <div>
                <p className="font-medium text-sdc-navy">{punishment.type}</p>
                <p className="text-sm text-sdc-gray">Duration: {punishment.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-sdc-gray" />
              <div>
                <p className="text-sm text-sdc-gray">Effective Period</p>
                <p className="font-medium text-sdc-navy">
                  {new Date(punishment.startDate).toLocaleDateString()} -{" "}
                  {new Date(punishment.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileText className="mt-0.5 h-5 w-5 text-sdc-gray" />
              <div>
                <p className="text-sm text-sdc-gray">Requirements</p>
                <p className="font-medium text-sdc-navy">{punishment.requirements}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Progress Tracking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-sdc-gray">Overall Progress</p>
                <p className="text-sm font-medium text-sdc-navy">{punishment.progress}%</p>
              </div>
              <div className="h-2.5 w-full rounded-full bg-gray-200">
                <div
                  className={cn(
                    "h-2.5 rounded-full",
                    punishment.status === "completed" ? "bg-emerald-500" : "bg-blue-500",
                  )}
                  style={{ width: `${punishment.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-sdc-gray" />
              <div>
                <p className="text-sm text-sdc-gray">Time Remaining</p>
                <p className="font-medium text-sdc-navy">
                  {Math.ceil((new Date(punishment.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}{" "}
                  days
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FileCheck className="h-5 w-5 text-sdc-gray" />
              <div>
                <p className="text-sm text-sdc-gray">Verification Status</p>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-full px-2.5 py-0.5 font-medium",
                      punishment.verificationStatus === "verified"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700",
                    )}
                  >
                    {punishment.verificationStatus.charAt(0).toUpperCase() + punishment.verificationStatus.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Punishment Details Tabs */}
      <Tabs defaultValue="milestones" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Milestones Tab */}
        <TabsContent value="milestones" className="space-y-4 pt-4">
          <div className="space-y-4">
            {punishment.milestones.map((milestone, index) => (
              <Card key={milestone.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "mt-0.5 flex h-10 w-10 items-center justify-center rounded-full",
                          milestone.status === "completed"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-blue-100 text-blue-600",
                        )}
                      >
                        {milestone.status === "completed" ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <Clock className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sdc-navy">{milestone.title}</h3>
                          <Badge
                            className={cn(
                              milestone.status === "completed" && "bg-emerald-500 hover:bg-emerald-600",
                              milestone.status === "pending" && "bg-blue-500 hover:bg-blue-600",
                            )}
                          >
                            {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-sdc-gray">Due: {new Date(milestone.dueDate).toLocaleDateString()}</p>
                        {milestone.completedDate && (
                          <p className="text-sm text-sdc-gray">
                            Completed: {new Date(milestone.completedDate).toLocaleDateString()}
                          </p>
                        )}
                        {milestone.verifiedBy && (
                          <p className="text-sm text-sdc-gray">Verified by: {milestone.verifiedBy}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4 pt-4">
          <div className="relative space-y-6 pl-6 pt-2">
            <div className="absolute bottom-0 left-2.5 top-0 w-px bg-border" />

            {punishment.history.map((event, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-6 flex h-5 w-5 items-center justify-center rounded-full border border-background bg-sdc-blue">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sdc-navy">{event.action}</h3>
                    <div className="text-xs text-sdc-gray">{new Date(event.date).toLocaleDateString()}</div>
                  </div>
                  <p className="mt-1 text-sm text-sdc-gray">{event.notes}</p>
                  <p className="mt-2 text-xs text-sdc-gray">By: {event.user}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" className="gap-1" onClick={() => onUpdatePunishment(punishment.id)}>
          <Edit className="h-4 w-4" />
          Update Status
        </Button>
        <Button
          className="bg-sdc-blue hover:bg-sdc-blue/90 text-white gap-1"
          disabled={punishment.status === "completed"}
        >
          <MessageSquare className="h-4 w-4" />
          Add Note
        </Button>
      </div>
    </div>
  )
}
