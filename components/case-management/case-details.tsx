"use client"

import { cn } from "@/lib/utils"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Clock,
  FileText,
  User,
  BookOpen,
  AlertTriangle,
  Building,
  GraduationCap,
  Mail,
  Phone,
} from "lucide-react"

// Mock case details data
const caseDetails = {
  id: "SDC-2024-091",
  student: {
    name: "Robert Chen",
    matricNumber: "STU-45789",
    department: "Computer Science",
    faculty: "Science and Technology",
    level: "300 Level",
    email: "robert.chen@university.edu",
    phone: "+1234567890",
    image: "/monogram-mb.png",
  },
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
  documents: [
    {
      name: "Original Term Paper",
      type: "PDF",
      uploadedBy: "Dr. Sarah Johnson",
      uploadDate: "2024-05-02",
    },
    {
      name: "Plagiarism Report",
      type: "PDF",
      uploadedBy: "Dr. Sarah Johnson",
      uploadDate: "2024-05-02",
    },
    {
      name: "Student Statement",
      type: "DOCX",
      uploadedBy: "Robert Chen",
      uploadDate: "2024-05-05",
    },
    {
      name: "Hearing Minutes",
      type: "PDF",
      uploadedBy: "Admin Assistant",
      uploadDate: "2024-05-10",
    },
  ],
  status: "pending",
  timeline: [
    {
      date: "2024-05-01",
      time: "2:30 PM",
      action: "Case Initiated",
      description: "Academic dishonesty case opened for Robert Chen",
      user: "Dr. Sarah Johnson",
    },
    {
      date: "2024-05-02",
      time: "10:15 AM",
      action: "Documents Uploaded",
      description: "Original term paper and plagiarism report uploaded",
      user: "Dr. Sarah Johnson",
    },
    {
      date: "2024-05-03",
      time: "3:45 PM",
      action: "Student Notified",
      description: "Formal notification sent to student",
      user: "Admin Assistant",
    },
    {
      date: "2024-05-05",
      time: "11:20 AM",
      action: "Student Response",
      description: "Student statement received",
      user: "Robert Chen",
    },
    {
      date: "2024-05-08",
      time: "9:30 AM",
      action: "Hearing Scheduled",
      description: "Disciplinary hearing scheduled for May 10, 2024",
      user: "Admin Assistant",
    },
    {
      date: "2024-05-10",
      time: "10:00 AM",
      action: "Hearing Conducted",
      description: "Disciplinary hearing held with committee and student",
      user: "Dr. Sarah Johnson",
    },
    {
      date: "2024-05-10",
      time: "11:30 AM",
      action: "Decision Made",
      description: "Committee decided on academic probation",
      user: "Dr. Sarah Johnson",
    },
  ],
}

interface CaseDetailsProps {
  caseId: string
}

export function CaseDetails({ caseId }: CaseDetailsProps) {
  // In a real application, you would fetch the case details based on the caseId
  // For this example, we'll use the mock data

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-start md:justify-between md:space-y-0">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={caseDetails.student.image || "/placeholder.svg"} alt={caseDetails.student.name} />
            <AvatarFallback>
              {caseDetails.student.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-semibold text-sdc-navy">{caseDetails.student.name}</h2>
              <Badge>{caseDetails.student.matricNumber}</Badge>
            </div>
            <div className="flex items-center space-x-2 text-sm text-sdc-gray">
              <GraduationCap className="h-4 w-4" />
              <span>
                {caseDetails.student.department}, {caseDetails.student.level}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-sdc-gray">
              <Building className="h-4 w-4" />
              <span>{caseDetails.student.faculty}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-sdc-gray">Case ID:</span>
            <span className="font-semibold text-sdc-navy">{caseDetails.id}</span>
          </div>
          <Badge
            className={cn(
              "px-3 py-1",
              caseDetails.status === "pending" && "bg-amber-500",
              caseDetails.status === "scheduled" && "bg-blue-500",
              caseDetails.status === "in-progress" && "bg-indigo-500",
              caseDetails.status === "resolved" && "bg-emerald-500",
            )}
          >
            {caseDetails.status.charAt(0).toUpperCase() + caseDetails.status.slice(1)}
          </Badge>
        </div>
      </div>

      <Separator />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="student">Student Info</TabsTrigger>
          <TabsTrigger value="hearings">Hearings</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Offence Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <BookOpen className="mt-0.5 h-5 w-5 text-sdc-blue" />
                  <div>
                    <p className="font-medium text-sdc-navy">{caseDetails.offence.type}</p>
                    <p className="text-sm text-sdc-gray">{caseDetails.offence.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-sdc-gray" />
                  <div>
                    <p className="text-sm text-sdc-gray">Incident Date</p>
                    <p className="font-medium text-sdc-navy">
                      {new Date(caseDetails.offence.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-sdc-gray" />
                  <div>
                    <p className="text-sm text-sdc-gray">Reported By</p>
                    <p className="font-medium text-sdc-navy">{caseDetails.offence.reportedBy}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Disciplinary Action</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-500" />
                  <div>
                    <p className="font-medium text-sdc-navy">{caseDetails.punishment.type}</p>
                    <p className="text-sm text-sdc-gray">Duration: {caseDetails.punishment.duration}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-sdc-gray" />
                  <div>
                    <p className="text-sm text-sdc-gray">Effective Period</p>
                    <p className="font-medium text-sdc-navy">
                      {new Date(caseDetails.punishment.startDate).toLocaleDateString()} -{" "}
                      {new Date(caseDetails.punishment.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="mt-0.5 h-5 w-5 text-sdc-gray" />
                  <div>
                    <p className="text-sm text-sdc-gray">Additional Requirements</p>
                    <p className="font-medium text-sdc-navy">{caseDetails.punishment.additionalRequirements}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {caseDetails.timeline.slice(0, 3).map((event, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-sdc-blue/10">
                      <Clock className="h-4 w-4 text-sdc-blue" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-sdc-navy">{event.action}</p>
                        <span className="text-xs text-sdc-gray">
                          {event.date} at {event.time}
                        </span>
                      </div>
                      <p className="text-sm text-sdc-gray">{event.description}</p>
                      <p className="text-xs text-sdc-gray">By: {event.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Student Info Tab */}
        <TabsContent value="student">
          <Card>
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
              <CardDescription>Detailed information about the student involved in this case.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-sdc-gray">Full Name</p>
                  <p className="font-medium text-sdc-navy">{caseDetails.student.name}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-sdc-gray">Matric Number</p>
                  <p className="font-medium text-sdc-navy">{caseDetails.student.matricNumber}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-sdc-gray">Department</p>
                  <p className="font-medium text-sdc-navy">{caseDetails.student.department}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-sdc-gray">Faculty</p>
                  <p className="font-medium text-sdc-navy">{caseDetails.student.faculty}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-sdc-gray">Level</p>
                  <p className="font-medium text-sdc-navy">{caseDetails.student.level}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-sdc-navy">Contact Information</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-sdc-gray" />
                    <div>
                      <p className="text-sm text-sdc-gray">Email Address</p>
                      <p className="font-medium text-sdc-navy">{caseDetails.student.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-sdc-gray" />
                    <div>
                      <p className="text-sm text-sdc-gray">Phone Number</p>
                      <p className="font-medium text-sdc-navy">{caseDetails.student.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hearings Tab */}
        <TabsContent value="hearings">
          <Card>
            <CardHeader>
              <CardTitle>Disciplinary Hearings</CardTitle>
              <CardDescription>Records of all hearings related to this case.</CardDescription>
            </CardHeader>
            <CardContent>
              {caseDetails.hearings.length === 0 ? (
                <p className="text-center text-sdc-gray">No hearings scheduled yet.</p>
              ) : (
                <div className="space-y-6">
                  {caseDetails.hearings.map((hearing, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-start sm:space-y-0">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-sdc-navy">Hearing #{index + 1}</h3>
                            <Badge>{hearing.status}</Badge>
                          </div>
                          <div className="mt-2 flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4 text-sdc-gray" />
                              <span className="text-sm text-sdc-gray">{hearing.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4 text-sdc-gray" />
                              <span className="text-sm text-sdc-gray">{hearing.time}</span>
                            </div>
                          </div>
                          <p className="mt-1 text-sm text-sdc-gray">Location: {hearing.location}</p>
                        </div>
                        <Button variant="outline" size="sm" className="shrink-0">
                          View Minutes
                        </Button>
                      </div>

                      <Separator className="my-4" />

                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-sdc-gray">Attendees</p>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {hearing.attendees.map((attendee, i) => (
                              <Badge key={i} variant="outline">
                                {attendee}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-sdc-gray">Notes</p>
                          <p className="mt-1 text-sm text-sdc-navy">{hearing.notes}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Case Documents</CardTitle>
              <CardDescription>All documents related to this disciplinary case.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {caseDetails.documents.map((document, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded bg-sdc-blue/10 text-sdc-blue">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-sdc-navy">{document.name}</p>
                        <div className="flex items-center space-x-2 text-xs text-sdc-gray">
                          <span>{document.type}</span>
                          <span>•</span>
                          <span>Uploaded by {document.uploadedBy}</span>
                          <span>•</span>
                          <span>{new Date(document.uploadDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Case Timeline</CardTitle>
              <CardDescription>Chronological history of all events related to this case.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-6 pl-6 pt-2">
                <div className="absolute bottom-0 left-2.5 top-0 w-px bg-border" />

                {caseDetails.timeline.map((event, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-6 flex h-5 w-5 items-center justify-center rounded-full border border-background bg-sdc-blue">
                      <div className="h-2 w-2 rounded-full bg-white" />
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sdc-navy">{event.action}</h3>
                        <div className="flex items-center space-x-1 text-xs text-sdc-gray">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{event.date}</span>
                          <span>•</span>
                          <Clock className="h-3.5 w-3.5" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-sdc-gray">{event.description}</p>
                      <p className="mt-2 text-xs text-sdc-gray">By: {event.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Edit Case</Button>
        <Button className="bg-sdc-blue hover:bg-sdc-blue/90 text-white">Update Status</Button>
      </div>
    </div>
  )
}
