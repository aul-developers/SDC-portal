"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { FileText, AlertTriangle, Calendar, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

// Mock case history data
const caseHistoryData = {
  student: {
    name: "Robert Chen",
    matricNumber: "STU-45789",
    department: "Computer Science",
    level: "300 Level",
    image: "/monogram-mb.png",
  },
  cases: [
    {
      id: "SDC-2024-091",
      offence: {
        type: "Academic Dishonesty",
        description: "Plagiarism detected in final term paper for CSC301 - Software Engineering.",
        date: "2024-05-01",
        reportedBy: "Dr. Sarah Johnson",
      },
      punishment: {
        type: "Academic Probation",
        duration: "1 Semester",
        startDate: "2024-05-15",
        endDate: "2024-09-15",
        additionalRequirements: "Must attend academic integrity workshop and resubmit the paper.",
      },
      hearings: [
        {
          date: "2024-05-10",
          time: "10:00 AM",
          location: "Admin Building, Room 203",
          status: "Completed",
          attendees: ["Dr. Sarah Johnson", "Prof. David Wilson", "Robert Chen"],
          notes: "Student admitted to plagiarism and expressed remorse. Committee decided on academic probation.",
        },
      ],
      status: "active",
      timeline: [
        {
          date: "2024-05-01",
          action: "Case Initiated",
          description: "Academic dishonesty case opened",
          user: "Dr. Sarah Johnson",
        },
        {
          date: "2024-05-03",
          action: "Student Notified",
          description: "Formal notification sent to student",
          user: "Admin Assistant",
        },
        {
          date: "2024-05-10",
          action: "Hearing Conducted",
          description: "Disciplinary hearing held with committee and student",
          user: "Dr. Sarah Johnson",
        },
        {
          date: "2024-05-10",
          action: "Decision Made",
          description: "Committee decided on academic probation",
          user: "Dr. Sarah Johnson",
        },
      ],
    },
    {
      id: "SDC-2023-045",
      offence: {
        type: "Behavioral Misconduct",
        description: "Disruptive behavior during midterm examination for MTH201 - Linear Algebra.",
        date: "2023-10-15",
        reportedBy: "Prof. Michael Brown",
      },
      punishment: {
        type: "Written Warning",
        duration: "N/A",
        startDate: "2023-10-25",
        endDate: "2023-10-25",
        additionalRequirements: "Formal apology to the class and professor.",
      },
      hearings: [
        {
          date: "2023-10-23",
          time: "2:30 PM",
          location: "Admin Building, Room 101",
          status: "Completed",
          attendees: ["Prof. Michael Brown", "Dr. Sarah Johnson", "Robert Chen"],
          notes: "Student acknowledged disruptive behavior and agreed to formal apology.",
        },
      ],
      status: "resolved",
      timeline: [
        {
          date: "2023-10-15",
          action: "Case Initiated",
          description: "Behavioral misconduct case opened",
          user: "Prof. Michael Brown",
        },
        {
          date: "2023-10-17",
          action: "Student Notified",
          description: "Formal notification sent to student",
          user: "Admin Assistant",
        },
        {
          date: "2023-10-23",
          action: "Hearing Conducted",
          description: "Disciplinary hearing held with committee and student",
          user: "Dr. Sarah Johnson",
        },
        {
          date: "2023-10-23",
          action: "Decision Made",
          description: "Committee decided on written warning",
          user: "Dr. Sarah Johnson",
        },
        {
          date: "2023-10-25",
          action: "Punishment Completed",
          description: "Student delivered formal apology",
          user: "Prof. Michael Brown",
        },
        {
          date: "2023-10-25",
          action: "Case Closed",
          description: "Case marked as resolved",
          user: "Dr. Sarah Johnson",
        },
      ],
    },
  ],
}

interface StudentCaseHistoryProps {
  matricNumber: string
}

export function StudentCaseHistory({ matricNumber }: StudentCaseHistoryProps) {
  // In a real application, you would fetch the case history data based on the matricNumber
  // For this example, we'll use the mock data

  return (
    <div className="space-y-6">
      {/* Student Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border border-border">
            <AvatarImage src={caseHistoryData.student.image || "/placeholder.svg"} alt={caseHistoryData.student.name} />
            <AvatarFallback>
              {caseHistoryData.student.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-sdc-navy">{caseHistoryData.student.name}</h2>
              <Badge variant="outline">{caseHistoryData.student.matricNumber}</Badge>
            </div>
            <p className="text-sm text-sdc-gray">
              {caseHistoryData.student.department}, {caseHistoryData.student.level}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="bg-amber-500">
            {caseHistoryData.cases.filter((c) => c.status === "active").length} Active Cases
          </Badge>
          <Badge variant="outline">{caseHistoryData.cases.length} Total Cases</Badge>
        </div>
      </div>

      {/* Case History Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Cases</TabsTrigger>
          <TabsTrigger value="active">Active Cases</TabsTrigger>
          <TabsTrigger value="resolved">Resolved Cases</TabsTrigger>
        </TabsList>

        {/* All Cases Tab */}
        <TabsContent value="all" className="space-y-6 pt-4">
          {caseHistoryData.cases.map((caseItem, index) => (
            <CaseCard key={index} caseItem={caseItem} />
          ))}
        </TabsContent>

        {/* Active Cases Tab */}
        <TabsContent value="active" className="space-y-6 pt-4">
          {caseHistoryData.cases
            .filter((caseItem) => caseItem.status === "active")
            .map((caseItem, index) => (
              <CaseCard key={index} caseItem={caseItem} />
            ))}
        </TabsContent>

        {/* Resolved Cases Tab */}
        <TabsContent value="resolved" className="space-y-6 pt-4">
          {caseHistoryData.cases
            .filter((caseItem) => caseItem.status === "resolved")
            .map((caseItem, index) => (
              <CaseCard key={index} caseItem={caseItem} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Case Card Component
function CaseCard({ caseItem }: { caseItem: any }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/20 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">{caseItem.id}</CardTitle>
            <Badge
              className={cn(
                caseItem.status === "active" && "bg-amber-500 hover:bg-amber-600",
                caseItem.status === "pending" && "bg-blue-500 hover:bg-blue-600",
                caseItem.status === "closed" && "bg-emerald-500 hover:bg-emerald-600",
              )}
            >
              {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} className="gap-1">
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4" /> Less Details
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" /> More Details
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <FileText className="mt-0.5 h-5 w-5 text-sdc-blue" />
              <div>
                <p className="text-sm text-sdc-gray">Offence</p>
                <p className="font-medium text-sdc-navy">{caseItem.offence.type}</p>
                <p className="text-sm text-sdc-gray">{caseItem.offence.description}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-500" />
              <div>
                <p className="text-sm text-sdc-gray">Punishment</p>
                <p className="font-medium text-sdc-navy">{caseItem.punishment.type}</p>
                <p className="text-sm text-sdc-gray">
                  {caseItem.punishment.duration !== "N/A" && `Duration: ${caseItem.punishment.duration}`}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-sdc-gray" />
              <div>
                <p className="text-sm text-sdc-gray">Incident Date</p>
                <p className="font-medium text-sdc-navy">{new Date(caseItem.offence.date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-sdc-gray" />
              <div>
                <p className="text-sm text-sdc-gray">Punishment Start</p>
                <p className="font-medium text-sdc-navy">
                  {new Date(caseItem.punishment.startDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-sdc-gray" />
              <div>
                <p className="text-sm text-sdc-gray">Punishment End</p>
                <p className="font-medium text-sdc-navy">
                  {new Date(caseItem.punishment.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {expanded && (
            <div className="mt-4 space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="mb-3 font-medium text-sdc-navy">Hearing Details</h3>
                {caseItem.hearings.map((hearing: any, index: number) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-sdc-gray" />
                        <span className="text-sm text-sdc-gray">
                          {new Date(hearing.date).toLocaleDateString()} at {hearing.time}
                        </span>
                      </div>
                      <Badge variant="outline">{hearing.status}</Badge>
                    </div>
                    <p className="text-sm text-sdc-gray">Location: {hearing.location}</p>
                    <p className="text-sm text-sdc-gray">
                      <span className="font-medium">Attendees:</span> {hearing.attendees.join(", ")}
                    </p>
                    <p className="text-sm text-sdc-gray">
                      <span className="font-medium">Notes:</span> {hearing.notes}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="mb-3 font-medium text-sdc-navy">Case Timeline</h3>
                <div className="relative space-y-4 pl-6">
                  <div className="absolute bottom-0 left-2.5 top-0 w-px bg-border" />
                  {caseItem.timeline.map((event: any, index: number) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-6 flex h-5 w-5 items-center justify-center rounded-full border border-background bg-sdc-blue">
                        <div className="h-2 w-2 rounded-full bg-white" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sdc-navy">{event.action}</p>
                          <p className="text-xs text-sdc-gray">{new Date(event.date).toLocaleDateString()}</p>
                        </div>
                        <p className="text-sm text-sdc-gray">{event.description}</p>
                        <p className="text-xs text-sdc-gray">By: {event.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button variant="outline" size="sm" className="gap-1">
              <FileText className="h-4 w-4" />
              View Full Case
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
