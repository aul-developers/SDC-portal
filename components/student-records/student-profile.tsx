"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Building,
  AlertTriangle,
  FileText,
  Clock,
  Download,
} from "lucide-react"

// Mock student data
const studentData = {
  name: "Robert Chen",
  matricNumber: "STU-45789",
  department: "Computer Science",
  faculty: "Science and Technology",
  level: "300 Level",
  email: "robert.chen@university.edu",
  phone: "+1234567890",
  address: "123 University Housing, Campus Road",
  dateOfBirth: "1999-05-15",
  enrollmentDate: "2021-09-01",
  academicStatus: "Good Standing",
  cgpa: "3.75",
  image: "/monogram-mb.png",
  emergencyContact: {
    name: "Wei Chen",
    relationship: "Father",
    phone: "+1234567891",
    email: "wei.chen@example.com",
  },
  disciplinaryRecord: {
    status: "active",
    caseCount: 2,
    currentPunishment: "Academic Probation",
    punishmentEndDate: "2024-09-15",
  },
  academicHistory: [
    {
      semester: "Fall 2021",
      gpa: "3.8",
      courses: [
        { code: "CSC101", title: "Introduction to Computer Science", grade: "A" },
        { code: "MTH101", title: "Calculus I", grade: "A-" },
        { code: "PHY101", title: "Physics I", grade: "B+" },
        { code: "ENG101", title: "English Composition", grade: "A" },
      ],
    },
    {
      semester: "Spring 2022",
      gpa: "3.7",
      courses: [
        { code: "CSC102", title: "Programming Fundamentals", grade: "A" },
        { code: "MTH102", title: "Calculus II", grade: "B+" },
        { code: "PHY102", title: "Physics II", grade: "B+" },
        { code: "SOC101", title: "Introduction to Sociology", grade: "A-" },
      ],
    },
    {
      semester: "Fall 2022",
      gpa: "3.9",
      courses: [
        { code: "CSC201", title: "Data Structures", grade: "A" },
        { code: "CSC203", title: "Computer Architecture", grade: "A-" },
        { code: "MTH201", title: "Linear Algebra", grade: "A" },
        { code: "PHI101", title: "Introduction to Philosophy", grade: "A-" },
      ],
    },
    {
      semester: "Spring 2023",
      gpa: "3.6",
      courses: [
        { code: "CSC202", title: "Algorithms", grade: "B+" },
        { code: "CSC204", title: "Database Systems", grade: "A" },
        { code: "CSC206", title: "Software Engineering", grade: "A-" },
        { code: "STA201", title: "Statistics for Computer Science", grade: "B+" },
      ],
    },
  ],
}

interface StudentProfileProps {
  matricNumber: string
}

export function StudentProfile({ matricNumber }: StudentProfileProps) {
  // In a real application, you would fetch the student data based on the matricNumber
  // For this example, we'll use the mock data

  return (
    <div className="space-y-6">
      {/* Student Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-border">
            <AvatarImage src={studentData.image || "/placeholder.svg"} alt={studentData.name} />
            <AvatarFallback className="text-xl">
              {studentData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold text-sdc-navy">{studentData.name}</h2>
              <Badge variant="outline" className="ml-2">
                {studentData.matricNumber}
              </Badge>
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-sdc-gray">
              <GraduationCap className="h-4 w-4" />
              <span>
                {studentData.department}, {studentData.level}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-sdc-gray">
              <Building className="h-4 w-4" />
              <span>{studentData.faculty}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 md:items-end">
          <div className="flex items-center gap-2">
            <Badge
              className={
                studentData.disciplinaryRecord.status === "active"
                  ? "bg-amber-500 hover:bg-amber-600"
                  : "bg-emerald-500 hover:bg-emerald-600"
              }
            >
              {studentData.disciplinaryRecord.status === "active" ? "Active Record" : "Clear Record"}
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              CGPA: {studentData.cgpa}
            </Badge>
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export Profile
          </Button>
        </div>
      </div>

      <Separator />

      {/* Student Details Tabs */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="academic">Academic Record</TabsTrigger>
          <TabsTrigger value="disciplinary">Disciplinary Status</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-sdc-gray" />
                  <div>
                    <p className="text-sm text-sdc-gray">Email Address</p>
                    <p className="font-medium text-sdc-navy">{studentData.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-sdc-gray" />
                  <div>
                    <p className="text-sm text-sdc-gray">Phone Number</p>
                    <p className="font-medium text-sdc-navy">{studentData.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-sdc-gray" />
                  <div>
                    <p className="text-sm text-sdc-gray">Address</p>
                    <p className="font-medium text-sdc-navy">{studentData.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-sdc-gray" />
                  <div>
                    <p className="text-sm text-sdc-gray">Name</p>
                    <p className="font-medium text-sdc-navy">
                      {studentData.emergencyContact.name} ({studentData.emergencyContact.relationship})
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-sdc-gray" />
                  <div>
                    <p className="text-sm text-sdc-gray">Phone Number</p>
                    <p className="font-medium text-sdc-navy">{studentData.emergencyContact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-sdc-gray" />
                  <div>
                    <p className="text-sm text-sdc-gray">Email Address</p>
                    <p className="font-medium text-sdc-navy">{studentData.emergencyContact.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Personal Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-sdc-gray" />
                  <div>
                    <p className="text-sm text-sdc-gray">Date of Birth</p>
                    <p className="font-medium text-sdc-navy">
                      {new Date(studentData.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-sdc-gray" />
                  <div>
                    <p className="text-sm text-sdc-gray">Enrollment Date</p>
                    <p className="font-medium text-sdc-navy">
                      {new Date(studentData.enrollmentDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-sdc-gray" />
                  <div>
                    <p className="text-sm text-sdc-gray">Academic Status</p>
                    <p className="font-medium text-sdc-navy">{studentData.academicStatus}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic Record Tab */}
        <TabsContent value="academic" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Summary</CardTitle>
              <CardDescription>Overview of academic performance and achievements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-blue-50 p-4 text-center">
                  <p className="text-sm font-medium text-blue-700">Cumulative GPA</p>
                  <p className="mt-1 text-3xl font-bold text-blue-700">{studentData.cgpa}</p>
                </div>
                <div className="rounded-lg bg-emerald-50 p-4 text-center">
                  <p className="text-sm font-medium text-emerald-700">Completed Credits</p>
                  <p className="mt-1 text-3xl font-bold text-emerald-700">72</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-4 text-center">
                  <p className="text-sm font-medium text-amber-700">Remaining Credits</p>
                  <p className="mt-1 text-3xl font-bold text-amber-700">48</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {studentData.academicHistory.map((semester, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{semester.semester}</CardTitle>
                    <Badge className="bg-blue-500">GPA: {semester.gpa}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course Code</TableHead>
                          <TableHead>Course Title</TableHead>
                          <TableHead className="text-right">Grade</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {semester.courses.map((course, courseIndex) => (
                          <TableRow key={courseIndex}>
                            <TableCell className="font-medium">{course.code}</TableCell>
                            <TableCell>{course.title}</TableCell>
                            <TableCell className="text-right font-medium">{course.grade}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Disciplinary Status Tab */}
        <TabsContent value="disciplinary" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Disciplinary Status</CardTitle>
              <CardDescription>Current disciplinary standing and active sanctions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div
                  className={`rounded-lg p-4 text-center ${
                    studentData.disciplinaryRecord.status === "active"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  <p className="text-sm font-medium">Record Status</p>
                  <p className="mt-1 text-xl font-bold">
                    {studentData.disciplinaryRecord.status === "active" ? "Active Record" : "Clear Record"}
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-sm font-medium text-gray-700">Total Cases</p>
                  <p className="mt-1 text-xl font-bold text-gray-700">{studentData.disciplinaryRecord.caseCount}</p>
                </div>
                <div
                  className={`rounded-lg p-4 text-center ${
                    studentData.disciplinaryRecord.currentPunishment
                      ? "bg-amber-50 text-amber-700"
                      : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  <p className="text-sm font-medium">Current Sanctions</p>
                  <p className="mt-1 text-xl font-bold">{studentData.disciplinaryRecord.currentPunishment || "None"}</p>
                </div>
              </div>

              {studentData.disciplinaryRecord.currentPunishment && (
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-medium text-sdc-navy">Active Disciplinary Measure</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-500" />
                      <div>
                        <p className="font-medium text-sdc-navy">{studentData.disciplinaryRecord.currentPunishment}</p>
                        <p className="text-sm text-sdc-gray">
                          Ends on {new Date(studentData.disciplinaryRecord.punishmentEndDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FileText className="mt-0.5 h-5 w-5 text-sdc-gray" />
                      <div>
                        <p className="text-sm text-sdc-gray">Additional Requirements</p>
                        <p className="font-medium text-sdc-navy">
                          Must attend academic integrity workshop and resubmit the paper.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-5 w-5 text-sdc-gray" />
                      <div>
                        <p className="text-sm text-sdc-gray">Progress</p>
                        <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                          <div className="h-full w-[60%] rounded-full bg-amber-500"></div>
                        </div>
                        <p className="mt-1 text-xs text-sdc-gray">
                          60% complete - 4 months remaining out of 6 months total
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-center">
                <Button className="bg-sdc-blue hover:bg-sdc-blue/90 text-white">View Full Case History</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Import the Table components
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
