"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface CreateCaseFormProps {
  onSuccess: () => void
}

export function CreateCaseForm({ onSuccess }: CreateCaseFormProps) {
  const [date, setDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      onSuccess()
    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-lg border shadow-sm p-6 space-y-6">
          <h3 className="text-lg font-semibold text-sdc-navy border-b pb-3">Student Information</h3>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="student-id" className="text-sm font-medium">
                Student Matric Number
              </Label>
              <Input id="student-id" placeholder="Enter matric number" className="h-11" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="student-name" className="text-sm font-medium">
                Student Name
              </Label>
              <Input id="student-name" placeholder="Enter student name" className="h-11" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department" className="text-sm font-medium">
                Department
              </Label>
              <Select required>
                <SelectTrigger id="department" className="h-11">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="business">Business Administration</SelectItem>
                  <SelectItem value="medicine">Medicine</SelectItem>
                  <SelectItem value="law">Law</SelectItem>
                  <SelectItem value="arts">Arts and Humanities</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="level" className="text-sm font-medium">
                Level
              </Label>
              <Select required>
                <SelectTrigger id="level" className="h-11">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">100 Level</SelectItem>
                  <SelectItem value="200">200 Level</SelectItem>
                  <SelectItem value="300">300 Level</SelectItem>
                  <SelectItem value="400">400 Level</SelectItem>
                  <SelectItem value="500">500 Level</SelectItem>
                  <SelectItem value="postgraduate">Postgraduate</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6 space-y-6">
          <h3 className="text-lg font-semibold text-sdc-navy border-b pb-3">Offence Details</h3>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="offence-type" className="text-sm font-medium">
                Offence Type
              </Label>
              <Select required>
                <SelectTrigger id="offence-type" className="h-11">
                  <SelectValue placeholder="Select offence type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="academic-dishonesty">Academic Dishonesty</SelectItem>
                  <SelectItem value="behavioral-misconduct">Behavioral Misconduct</SelectItem>
                  <SelectItem value="property-damage">Property Damage</SelectItem>
                  <SelectItem value="substance-violation">Substance Violation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="incident-date" className="text-sm font-medium">
                Incident Date
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Provide a detailed description of the offence"
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reported-by" className="text-sm font-medium">
              Reported By
            </Label>
            <Input id="reported-by" placeholder="Name of the person reporting the offence" className="h-11" required />
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6 space-y-6">
          <h3 className="text-lg font-semibold text-sdc-navy border-b pb-3">Initial Assessment</h3>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="severity" className="text-sm font-medium">
                Severity
              </Label>
              <Select required>
                <SelectTrigger id="severity" className="h-11">
                  <SelectValue placeholder="Select severity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority" className="text-sm font-medium">
                Priority
              </Label>
              <Select required>
                <SelectTrigger id="priority" className="h-11">
                  <SelectValue placeholder="Select priority level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="initial-notes" className="text-sm font-medium">
              Initial Notes
            </Label>
            <Textarea
              id="initial-notes"
              placeholder="Any initial notes or observations about the case"
              className="min-h-[100px]"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t">
          <Button type="button" variant="outline" onClick={onSuccess} className="px-6">
            Cancel
          </Button>
          <Button type="submit" className="bg-sdc-blue hover:bg-sdc-blue/90 text-white px-6" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Case"}
          </Button>
        </div>
      </form>
    </div>
  )
}
