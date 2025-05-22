"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, FileEdit, Trash2 } from "lucide-react"

// Import the same mock data from offence-list.tsx
// Mock data for offences
const offencesData = {
  academic: [
    {
      id: "a1",
      name: "Plagiarism",
      description: "Using another's work without proper attribution",
      severity: "major",
      standardPunishment: "Academic probation, Grade reduction",
      precedents: 24,
      category: "Academic Integrity",
    },
    {
      id: "a2",
      name: "Cheating on Exams",
      description: "Using unauthorized materials during an examination",
      severity: "major",
      standardPunishment: "Course failure, Academic probation",
      precedents: 18,
      category: "Academic Integrity",
    },
    {
      id: "a3",
      name: "Unauthorized Collaboration",
      description: "Working with others when individual work is required",
      severity: "moderate",
      standardPunishment: "Assignment failure, Warning",
      precedents: 15,
      category: "Academic Integrity",
    },
    {
      id: "a4",
      name: "Falsification of Data",
      description: "Manipulating research data or results",
      severity: "severe",
      standardPunishment: "Course failure, Academic suspension",
      precedents: 7,
      category: "Academic Integrity",
    },
    {
      id: "a5",
      name: "Multiple Submission",
      description: "Submitting the same work for multiple courses",
      severity: "minor",
      standardPunishment: "Warning, Resubmission required",
      precedents: 12,
      category: "Academic Integrity",
    },
  ],
  behavioral: [
    {
      id: "b1",
      name: "Disruptive Behavior",
      description: "Interfering with university activities",
      severity: "moderate",
      standardPunishment: "Disciplinary probation, Community service",
      precedents: 31,
      category: "Behavioral Misconduct",
    },
    {
      id: "b2",
      name: "Harassment",
      description: "Unwelcome conduct based on protected characteristics",
      severity: "severe",
      standardPunishment: "Suspension, Mandatory counseling",
      precedents: 14,
      category: "Behavioral Misconduct",
    },
    {
      id: "b3",
      name: "Physical Altercation",
      description: "Engaging in physical fights or violence",
      severity: "severe",
      standardPunishment: "Suspension or expulsion",
      precedents: 9,
      category: "Behavioral Misconduct",
    },
    {
      id: "b4",
      name: "Bullying",
      description: "Repeated aggressive behavior toward others",
      severity: "major",
      standardPunishment: "Disciplinary probation, Mandatory counseling",
      precedents: 17,
      category: "Behavioral Misconduct",
    },
    {
      id: "b5",
      name: "Failure to Comply",
      description: "Not following directives from university officials",
      severity: "minor",
      standardPunishment: "Warning, Educational program",
      precedents: 22,
      category: "Behavioral Misconduct",
    },
  ],
  residential: [
    {
      id: "r1",
      name: "Quiet Hours Violation",
      description: "Making excessive noise during designated quiet hours",
      severity: "minor",
      standardPunishment: "Warning, Community service",
      precedents: 47,
      category: "Residential Violations",
    },
    {
      id: "r2",
      name: "Unauthorized Guest",
      description: "Having guests stay beyond allowed periods",
      severity: "minor",
      standardPunishment: "Warning, Fine",
      precedents: 38,
      category: "Residential Violations",
    },
    {
      id: "r3",
      name: "Property Damage",
      description: "Damaging university housing property",
      severity: "moderate",
      standardPunishment: "Restitution, Disciplinary probation",
      precedents: 25,
      category: "Residential Violations",
    },
    {
      id: "r4",
      name: "Unauthorized Pet",
      description: "Keeping animals not permitted in housing",
      severity: "minor",
      standardPunishment: "Warning, Removal of pet",
      precedents: 19,
      category: "Residential Violations",
    },
    {
      id: "r5",
      name: "Fire Safety Violation",
      description: "Tampering with fire equipment or causing fire hazards",
      severity: "major",
      standardPunishment: "Housing probation, Fine",
      precedents: 12,
      category: "Residential Violations",
    },
  ],
  administrative: [
    {
      id: "ad1",
      name: "Falsification of Records",
      description: "Providing false information on university documents",
      severity: "major",
      standardPunishment: "Disciplinary probation, Possible suspension",
      precedents: 8,
      category: "Administrative Violations",
    },
    {
      id: "ad2",
      name: "Unauthorized Access",
      description: "Entering restricted areas without permission",
      severity: "moderate",
      standardPunishment: "Disciplinary probation, Loss of privileges",
      precedents: 14,
      category: "Administrative Violations",
    },
    {
      id: "ad3",
      name: "Failure to Identify",
      description: "Refusing to provide identification when requested",
      severity: "minor",
      standardPunishment: "Warning, Educational program",
      precedents: 11,
      category: "Administrative Violations",
    },
  ],
  safety: [
    {
      id: "s1",
      name: "Weapon Possession",
      description: "Possessing prohibited weapons on campus",
      severity: "severe",
      standardPunishment: "Suspension or expulsion",
      precedents: 5,
      category: "Safety & Security",
    },
    {
      id: "s2",
      name: "Tampering with Safety Equipment",
      description: "Disabling or misusing safety devices",
      severity: "major",
      standardPunishment: "Disciplinary probation, Fine",
      precedents: 9,
      category: "Safety & Security",
    },
    {
      id: "s3",
      name: "Reckless Endangerment",
      description: "Creating substantial risk of injury to others",
      severity: "major",
      standardPunishment: "Disciplinary probation, Possible suspension",
      precedents: 7,
      category: "Safety & Security",
    },
  ],
  technology: [
    {
      id: "t1",
      name: "Unauthorized Access to Systems",
      description: "Accessing computer systems without permission",
      severity: "major",
      standardPunishment: "Loss of privileges, Disciplinary probation",
      precedents: 6,
      category: "Technology Misuse",
    },
    {
      id: "t2",
      name: "Misuse of University Computing",
      description: "Using university technology for prohibited activities",
      severity: "moderate",
      standardPunishment: "Loss of privileges, Educational program",
      precedents: 13,
      category: "Technology Misuse",
    },
    {
      id: "t3",
      name: "Copyright Violation",
      description: "Unauthorized sharing of copyrighted materials",
      severity: "moderate",
      standardPunishment: "Warning, Educational program",
      precedents: 17,
      category: "Technology Misuse",
    },
  ],
  substance: [
    {
      id: "su1",
      name: "Alcohol in Dry Areas",
      description: "Possessing alcohol in prohibited campus locations",
      severity: "minor",
      standardPunishment: "Warning, Educational program",
      precedents: 42,
      category: "Substance Violations",
    },
    {
      id: "su2",
      name: "Underage Drinking",
      description: "Consuming alcohol under legal age",
      severity: "moderate",
      standardPunishment: "Disciplinary probation, Educational program",
      precedents: 36,
      category: "Substance Violations",
    },
    {
      id: "su3",
      name: "Drug Possession",
      description: "Possessing illegal drugs on campus",
      severity: "major",
      standardPunishment: "Disciplinary probation, Possible suspension",
      precedents: 21,
      category: "Substance Violations",
    },
    {
      id: "su4",
      name: "Distribution of Controlled Substances",
      description: "Selling or providing illegal drugs to others",
      severity: "severe",
      standardPunishment: "Suspension or expulsion",
      precedents: 8,
      category: "Substance Violations",
    },
  ],
  legal: [
    {
      id: "l1",
      name: "Theft",
      description: "Taking property without permission",
      severity: "major",
      standardPunishment: "Disciplinary probation, Restitution",
      precedents: 19,
      category: "Legal Violations",
    },
    {
      id: "l2",
      name: "Vandalism",
      description: "Deliberately damaging property",
      severity: "moderate",
      standardPunishment: "Restitution, Disciplinary probation",
      precedents: 23,
      category: "Legal Violations",
    },
    {
      id: "l3",
      name: "Trespassing",
      description: "Entering property without authorization",
      severity: "minor",
      standardPunishment: "Warning, Educational program",
      precedents: 15,
      category: "Legal Violations",
    },
  ],
}

// Flatten all offences into a single array for global search
const allOffences = Object.values(offencesData)
  .flat()
  .map((offence) => ({
    ...offence,
  }))

// Severity badge colors
const severityColors = {
  minor: "bg-blue-100 text-blue-800",
  moderate: "bg-yellow-100 text-yellow-800",
  major: "bg-orange-100 text-orange-800",
  severe: "bg-red-100 text-red-800",
}

interface GlobalOffenceSearchProps {
  searchQuery: string
  severityFilter: string | null
  onSelectOffence: (offenceId: string) => void
}

export function GlobalOffenceSearch({ searchQuery, severityFilter, onSelectOffence }: GlobalOffenceSearchProps) {
  // Filter offences based on search query and severity filter
  const filteredOffences = allOffences.filter((offence) => {
    const matchesSearch =
      offence.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offence.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offence.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSeverity = !severityFilter || offence.severity === severityFilter

    return matchesSearch && matchesSeverity
  })

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Offence Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Standard Punishment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOffences.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No offences found matching your search criteria.
                </TableCell>
              </TableRow>
            ) : (
              filteredOffences.map((offence) => (
                <TableRow key={offence.id}>
                  <TableCell className="font-medium">{offence.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{offence.category}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{offence.description}</TableCell>
                  <TableCell>
                    <Badge className={severityColors[offence.severity as keyof typeof severityColors]}>
                      {offence.severity.charAt(0).toUpperCase() + offence.severity.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{offence.standardPunishment}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelectOffence(offence.id)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="text-sm text-muted-foreground">
        Found {filteredOffences.length} offences matching your search criteria
      </div>
    </div>
  )
}
