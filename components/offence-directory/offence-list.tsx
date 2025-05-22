"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Edit2, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

// Simplified offence data with updated severity levels
const offencesData = [
  {
    id: "a1",
    name: "Plagiarism",
    severity: "high",
    standardPunishment: "Academic probation, Grade reduction",
  },
  {
    id: "a2",
    name: "Cheating on Exams",
    severity: "high",
    standardPunishment: "Course failure, Academic probation",
  },
  {
    id: "a3",
    name: "Unauthorized Collaboration",
    severity: "medium",
    standardPunishment: "Assignment failure, Warning",
  },
  {
    id: "a4",
    name: "Falsification of Data",
    severity: "high",
    standardPunishment: "Course failure, Academic suspension",
  },
  {
    id: "a5",
    name: "Multiple Submission",
    severity: "low",
    standardPunishment: "Warning, Resubmission required",
  },
  {
    id: "b1",
    name: "Disruptive Behavior",
    severity: "medium",
    standardPunishment: "Disciplinary probation, Community service",
  },
  {
    id: "b2",
    name: "Harassment",
    severity: "high",
    standardPunishment: "Suspension, Mandatory counseling",
  },
  {
    id: "b3",
    name: "Physical Altercation",
    severity: "high",
    standardPunishment: "Suspension or expulsion",
  },
  {
    id: "b4",
    name: "Bullying",
    severity: "high",
    standardPunishment: "Disciplinary probation, Mandatory counseling",
  },
  {
    id: "b5",
    name: "Failure to Comply",
    severity: "low",
    standardPunishment: "Warning, Educational program",
  },
  {
    id: "r1",
    name: "Quiet Hours Violation",
    severity: "low",
    standardPunishment: "Warning, Community service",
  },
  {
    id: "r2",
    name: "Unauthorized Guest",
    severity: "low",
    standardPunishment: "Warning, Fine",
  },
  {
    id: "r3",
    name: "Property Damage",
    severity: "medium",
    standardPunishment: "Restitution, Disciplinary probation",
  },
  {
    id: "s1",
    name: "Weapon Possession",
    severity: "high",
    standardPunishment: "Suspension or expulsion",
  },
  {
    id: "s2",
    name: "Tampering with Safety Equipment",
    severity: "high",
    standardPunishment: "Disciplinary probation, Fine",
  },
  {
    id: "t2",
    name: "Misuse of University Computing",
    severity: "medium",
    standardPunishment: "Loss of privileges, Educational program",
  },
  {
    id: "su3",
    name: "Drug Possession",
    severity: "high",
    standardPunishment: "Disciplinary probation, Possible suspension",
  },
  {
    id: "l1",
    name: "Theft",
    severity: "high",
    standardPunishment: "Disciplinary probation, Restitution",
  },
]

// Severity badge colors with subtle color coding
const severityColors = {
  low: "bg-blue-50 text-blue-700 border-blue-100",
  medium: "bg-amber-50 text-amber-700 border-amber-100",
  high: "bg-red-50 text-red-700 border-red-100",
}

interface OffenceListProps {
  searchQuery: string
  severityFilter: string
  sortBy: string
  sortDirection: "asc" | "desc"
  onSelectOffence: (offenceId: string) => void
}

export function OffenceList({ searchQuery, severityFilter, sortBy, sortDirection, onSelectOffence }: OffenceListProps) {
  const [sortColumn, setSortColumn] = useState<string>("name")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")

  // Filter offences based on search query and severity filter
  const filteredOffences = offencesData.filter((offence) => {
    const matchesSearch =
      searchQuery === "" ||
      offence.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offence.standardPunishment.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSeverity = severityFilter === "all" || offence.severity === severityFilter

    return matchesSearch && matchesSeverity
  })

  // Sort offences based on selected column and direction
  const sortedOffences = [...filteredOffences].sort((a, b) => {
    const aValue = a[sortColumn as keyof typeof a]
    const bValue = b[sortColumn as keyof typeof b]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDir === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  // Handle column header click for sorting
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDir("asc")
    }
  }

  return (
    <Card className="border shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="cursor-pointer hover:bg-gray-100 w-[300px]" onClick={() => handleSort("name")}>
                Offence
                {sortColumn === "name" && <span className="ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>}
              </TableHead>
              <TableHead className="cursor-pointer hover:bg-gray-100 w-[150px]" onClick={() => handleSort("severity")}>
                Severity
                {sortColumn === "severity" && <span className="ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>}
              </TableHead>
              <TableHead>Standard Punishment</TableHead>
              <TableHead className="text-right w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedOffences.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No offences found matching your search.
                </TableCell>
              </TableRow>
            ) : (
              sortedOffences.map((offence) => (
                <TableRow key={offence.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{offence.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn("capitalize", severityColors[offence.severity as keyof typeof severityColors])}
                    >
                      {offence.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>{offence.standardPunishment}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit2 className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
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
      </CardContent>
    </Card>
  )
}
