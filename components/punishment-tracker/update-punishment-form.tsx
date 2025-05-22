"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"

// Mock punishment data (same as in PunishmentDetails)
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
}

interface UpdatePunishmentFormProps {
  punishmentId: string
  onSuccess: () => void
  onCancel: () => void
}

export function UpdatePunishmentForm({ punishmentId, onSuccess, onCancel }: UpdatePunishmentFormProps) {
  // In a real application, you would fetch the punishment details based on the punishmentId
  // For this example, we'll use the mock data
  const punishment = mockPunishmentDetails

  const [progress, setProgress] = useState(punishment.progress.toString())
  const [status, setStatus] = useState(punishment.status)
  const [notes, setNotes] = useState("")
  const [completedDate, setCompletedDate] = useState<Date | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedMilestones, setSelectedMilestones] = useState<string[]>([])

  const handleMilestoneToggle = (milestoneId: string) => {
    setSelectedMilestones((prev) =>
      prev.includes(milestoneId) ? prev.filter((id) => id !== milestoneId) : [...prev, milestoneId],
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      onSuccess()
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="progress">Progress (%)</Label>
              <Input
                id="progress"
                type="number"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus} required>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {status === "completed" && (
              <div className="space-y-2">
                <Label htmlFor="completed-date">Completion Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !completedDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {completedDate ? format(completedDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={completedDate} onSelect={setCompletedDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="notes">Update Notes</Label>
              <Textarea
                id="notes"
                placeholder="Enter notes about this update"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px]"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-sdc-navy mb-4">Update Milestones</h3>
          <div className="space-y-4">
            {punishment.milestones
              .filter((milestone) => milestone.status !== "completed")
              .map((milestone) => (
                <div key={milestone.id} className="flex items-start space-x-3 pb-4 border-b last:border-0 last:pb-0">
                  <Checkbox
                    id={milestone.id}
                    checked={selectedMilestones.includes(milestone.id)}
                    onCheckedChange={() => handleMilestoneToggle(milestone.id)}
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor={milestone.id}
                      className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {milestone.title}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Due: {new Date(milestone.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            {punishment.milestones.filter((milestone) => milestone.status !== "completed").length === 0 && (
              <p className="text-sm text-muted-foreground">All milestones have been completed.</p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" className="bg-sdc-blue hover:bg-sdc-blue/90 text-white" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Punishment"}
        </Button>
      </div>
    </form>
  )
}
