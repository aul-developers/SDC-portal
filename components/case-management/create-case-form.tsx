"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, User, FileText, AlertTriangle, UserCheck, Clock } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface CreateCaseFormProps {
  onSuccess: () => void
}

interface Student {
  name: string
  matricNumber: string
  faculty: string
  department: string
  level: string
  email: string
  phone: string
  role: string // For individual cases, this will always be "Primary Offender"
}

export function CreateCaseForm({ onSuccess }: CreateCaseFormProps) {
  const [date, setDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Student data as an array (even though it's just one student)
  const [student, setStudent] = useState<Student>({
    name: "",
    matricNumber: "",
    faculty: "",
    department: "",
    level: "",
    email: "",
    phone: "",
    role: "Primary Offender", // Default role for individual cases
  })

  const handleStudentChange = (field: keyof Student, value: string) => {
    setStudent((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)

    // Create the case data with students as an array (consistent with grouped cases)
    const caseData = {
      title: formData.get("case-title"),
      description: formData.get("description"),
      offenceType: formData.get("offence-type"),
      incidentDate: date ? format(date, "yyyy-MM-dd") : "",
      incidentTime: formData.get("incident-time"),
      location: formData.get("location"),
      priority: formData.get("priority"),
      // Send student as an array with one element - CONSISTENT WITH GROUPED CASES
      students: [student],
      reportedBy: formData.get("reported-by"),
      reporterTitle: formData.get("reporter-title"),
      reporterEmail: formData.get("reporter-email"),
      reporterPhone: formData.get("reporter-phone"),
      caseOfficer: formData.get("assigned-officer"),
      severity: formData.get("severity"),
      initialNotes: formData.get("initial-notes"),
      caseType: "individual", // Add case type for backend identification
    }

    console.log("Creating individual case with students array:", caseData)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      onSuccess()
    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-bold text-sdc-navy">Create Individual Case</h2>
        <p className="text-gray-600">Fill in all the details to create a new disciplinary case</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Case Information */}
        <div className="bg-white rounded-lg border shadow-sm p-6 space-y-6">
          <div className="flex items-center space-x-2 border-b pb-3">
            <FileText className="h-5 w-5 text-sdc-blue" />
            <h3 className="text-lg font-semibold text-sdc-navy">Basic Case Information</h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="case-title" className="text-sm font-medium">
                Case Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="case-title"
                name="case-title"
                placeholder="e.g., Academic Dishonesty - Examination Malpractice"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="offence-type" className="text-sm font-medium">
                Offence Type <span className="text-red-500">*</span>
              </Label>
              <Select name="offence-type" required>
                <SelectTrigger id="offence-type" className="h-11">
                  <SelectValue placeholder="Select offence type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="academic-dishonesty">Academic Dishonesty</SelectItem>
                  <SelectItem value="behavioral-misconduct">Behavioral Misconduct</SelectItem>
                  <SelectItem value="property-damage">Property Damage</SelectItem>
                  <SelectItem value="substance-violation">Substance Violation</SelectItem>
                  <SelectItem value="harassment">Harassment</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Case Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Provide a detailed description of the case and incident"
              className="min-h-[100px]"
              required
            />
          </div>
        </div>

        {/* Incident Details */}
        <div className="bg-white rounded-lg border shadow-sm p-6 space-y-6">
          <div className="flex items-center space-x-2 border-b pb-3">
            <Clock className="h-5 w-5 text-sdc-blue" />
            <h3 className="text-lg font-semibold text-sdc-navy">Incident Details</h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="incident-date" className="text-sm font-medium">
                Incident Date <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal h-11", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="incident-time" className="text-sm font-medium">
                Incident Time <span className="text-red-500">*</span>
              </Label>
              <Input id="incident-time" name="incident-time" type="time" className="h-11" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority" className="text-sm font-medium">
                Priority Level <span className="text-red-500">*</span>
              </Label>
              <Select name="priority" required>
                <SelectTrigger id="priority" className="h-11">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium">
              Location of Incident <span className="text-red-500">*</span>
            </Label>
            <Input
              id="location"
              name="location"
              placeholder="e.g., Main Library, Room 204, Computer Lab A"
              className="h-11"
              required
            />
          </div>
        </div>

        {/* Student Information */}
        <div className="bg-white rounded-lg border shadow-sm p-6 space-y-6">
          <div className="flex items-center space-x-2 border-b pb-3">
            <User className="h-5 w-5 text-sdc-blue" />
            <h3 className="text-lg font-semibold text-sdc-navy">Student Information</h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="student-name" className="text-sm font-medium">
                Student Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="student-name"
                placeholder="Enter student's full name"
                className="h-11"
                value={student.name}
                onChange={(e) => handleStudentChange("name", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="student-id" className="text-sm font-medium">
                Matric Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="student-id"
                placeholder="Enter matric number"
                className="h-11"
                value={student.matricNumber}
                onChange={(e) => handleStudentChange("matricNumber", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="faculty" className="text-sm font-medium">
                Faculty <span className="text-red-500">*</span>
              </Label>
              <Select value={student.faculty} onValueChange={(value) => handleStudentChange("faculty", value)} required>
                <SelectTrigger id="faculty" className="h-11">
                  <SelectValue placeholder="Select faculty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="science">Faculty of Science</SelectItem>
                  <SelectItem value="engineering">Faculty of Engineering</SelectItem>
                  <SelectItem value="arts">Faculty of Arts</SelectItem>
                  <SelectItem value="business">Faculty of Business</SelectItem>
                  <SelectItem value="medicine">Faculty of Medicine</SelectItem>
                  <SelectItem value="law">Faculty of Law</SelectItem>
                  <SelectItem value="education">Faculty of Education</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department" className="text-sm font-medium">
                Department <span className="text-red-500">*</span>
              </Label>
              <Select
                value={student.department}
                onValueChange={(value) => handleStudentChange("department", value)}
                required
              >
                <SelectTrigger id="department" className="h-11">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="electrical-engineering">Electrical Engineering</SelectItem>
                  <SelectItem value="mechanical-engineering">Mechanical Engineering</SelectItem>
                  <SelectItem value="business-admin">Business Administration</SelectItem>
                  <SelectItem value="medicine">Medicine</SelectItem>
                  <SelectItem value="law">Law</SelectItem>
                  <SelectItem value="english">English Language</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="level" className="text-sm font-medium">
                Academic Level <span className="text-red-500">*</span>
              </Label>
              <Select value={student.level} onValueChange={(value) => handleStudentChange("level", value)} required>
                <SelectTrigger id="level" className="h-11">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">100 Level</SelectItem>
                  <SelectItem value="200">200 Level</SelectItem>
                  <SelectItem value="300">300 Level</SelectItem>
                  <SelectItem value="400">400 Level</SelectItem>
                  <SelectItem value="500">500 Level</SelectItem>
                  <SelectItem value="graduate">Graduate Student</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="student-email" className="text-sm font-medium">
                Student Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="student-email"
                type="email"
                placeholder="student@university.edu"
                className="h-11"
                value={student.email}
                onChange={(e) => handleStudentChange("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="student-phone" className="text-sm font-medium">
                Phone Number
              </Label>
              <Input
                id="student-phone"
                type="tel"
                placeholder="+234 xxx xxx xxxx"
                className="h-11"
                value={student.phone}
                onChange={(e) => handleStudentChange("phone", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Reporter Information */}
        <div className="bg-white rounded-lg border shadow-sm p-6 space-y-6">
          <div className="flex items-center space-x-2 border-b pb-3">
            <UserCheck className="h-5 w-5 text-sdc-blue" />
            <h3 className="text-lg font-semibold text-sdc-navy">Reporter Information</h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="reported-by" className="text-sm font-medium">
                Reporter Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="reported-by"
                name="reported-by"
                placeholder="Name of person reporting"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reporter-title" className="text-sm font-medium">
                Reporter Title/Position <span className="text-red-500">*</span>
              </Label>
              <Input
                id="reporter-title"
                name="reporter-title"
                placeholder="e.g., Professor, Security Officer, Student"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reporter-email" className="text-sm font-medium">
                Reporter Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="reporter-email"
                name="reporter-email"
                type="email"
                placeholder="reporter@university.edu"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reporter-phone" className="text-sm font-medium">
                Reporter Phone
              </Label>
              <Input
                id="reporter-phone"
                name="reporter-phone"
                type="tel"
                placeholder="+234 xxx xxx xxxx"
                className="h-11"
              />
            </div>
          </div>
        </div>

        {/* Case Assignment */}
        <div className="bg-white rounded-lg border shadow-sm p-6 space-y-6">
          <div className="flex items-center space-x-2 border-b pb-3">
            <AlertTriangle className="h-5 w-5 text-sdc-blue" />
            <h3 className="text-lg font-semibold text-sdc-navy">Case Assignment & Assessment</h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="assigned-officer" className="text-sm font-medium">
                Assigned Case Officer <span className="text-red-500">*</span>
              </Label>
              <Select name="assigned-officer" required>
                <SelectTrigger id="assigned-officer" className="h-11">
                  <SelectValue placeholder="Select case officer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dr-johnson">Dr. Sarah Johnson</SelectItem>
                  <SelectItem value="prof-williams">Prof. Michael Williams</SelectItem>
                  <SelectItem value="dr-brown">Dr. Emily Brown</SelectItem>
                  <SelectItem value="mr-davis">Mr. James Davis</SelectItem>
                  <SelectItem value="ms-wilson">Ms. Lisa Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="severity" className="text-sm font-medium">
                Severity Assessment <span className="text-red-500">*</span>
              </Label>
              <Select name="severity" required>
                <SelectTrigger id="severity" className="h-11">
                  <SelectValue placeholder="Select severity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minor">Minor Offence</SelectItem>
                  <SelectItem value="moderate">Moderate Offence</SelectItem>
                  <SelectItem value="major">Major Offence</SelectItem>
                  <SelectItem value="severe">Severe Offence</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="initial-notes" className="text-sm font-medium">
              Initial Assessment Notes
            </Label>
            <Textarea
              id="initial-notes"
              name="initial-notes"
              placeholder="Any initial observations, evidence collected, or preliminary assessment notes"
              className="min-h-[100px]"
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t bg-gray-50 -mx-6 px-6 py-4 rounded-b-lg">
          <Button type="button" variant="outline" onClick={onSuccess} className="px-6">
            Cancel
          </Button>
          <Button type="submit" className="bg-sdc-blue hover:bg-sdc-blue/90 text-white px-6" disabled={isSubmitting}>
            {isSubmitting ? "Creating Case..." : "Create Individual Case"}
          </Button>
        </div>
      </form>
    </div>
  )
}
