"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

interface CreateGroupedCaseFormProps {
  onSuccess: () => void
}

export function CreateGroupedCaseForm({ onSuccess }: CreateGroupedCaseFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [offenceType, setOffenceType] = useState("")
  const [students, setStudents] = useState<Array<{ name: string; matricNumber: string; role: string }>>([])
  const [newStudent, setNewStudent] = useState({ name: "", matricNumber: "", role: "Collaborator" })

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.matricNumber) {
      setStudents([...students, newStudent])
      setNewStudent({ name: "", matricNumber: "", role: "Collaborator" })
    }
  }

  const handleRemoveStudent = (index: number) => {
    setStudents(students.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Creating grouped case:", { title, description, offenceType, students })
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Case Information</CardTitle>
          <CardDescription>Basic information about the grouped case</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Case Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Academic Dishonesty - Group Assignment"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of the incident..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="offenceType">Offence Type</Label>
            <Select value={offenceType} onValueChange={setOffenceType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select offence type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Academic Dishonesty">Academic Dishonesty</SelectItem>
                <SelectItem value="Behavioral Misconduct">Behavioral Misconduct</SelectItem>
                <SelectItem value="Property Damage">Property Damage</SelectItem>
                <SelectItem value="Substance Violation">Substance Violation</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Students Involved</CardTitle>
          <CardDescription>Add all students involved in this case</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name</Label>
              <Input
                id="studentName"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                placeholder="Full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="matricNumber">Matric Number</Label>
              <Input
                id="matricNumber"
                value={newStudent.matricNumber}
                onChange={(e) => setNewStudent({ ...newStudent, matricNumber: e.target.value })}
                placeholder="STU-12345"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={newStudent.role} onValueChange={(value) => setNewStudent({ ...newStudent, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Primary Offender">Primary Offender</SelectItem>
                  <SelectItem value="Collaborator">Collaborator</SelectItem>
                  <SelectItem value="Witness">Witness</SelectItem>
                  <SelectItem value="Victim">Victim</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button type="button" onClick={handleAddStudent} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </div>
          </div>

          {students.length > 0 && (
            <div className="space-y-2">
              <Label>Added Students</Label>
              <div className="space-y-2">
                {students.map((student, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.matricNumber}</p>
                      </div>
                      <Badge variant="outline">{student.role}</Badge>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveStudent(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
        <Button type="submit" className="bg-sdc-blue hover:bg-sdc-blue/90 text-white">
          Create Grouped Case
        </Button>
      </div>
    </form>
  )
}
