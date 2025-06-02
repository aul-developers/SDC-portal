"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Edit2, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { EditOffenceDialog } from "./edit-offence-dialog" // Import the dialog
import { DeleteOffenceConfirmationDialog } from "./delete-offence-confirmation-dialog" // Import the dialog

interface Offence {
  id: string
  name: string
  severity: "low" | "medium" | "high"
  standardPunishment: string
}

const initialOffencesData: Offence[] = [
  { id: "a1", name: "Plagiarism", severity: "high", standardPunishment: "Academic probation, Grade reduction" },
  { id: "a2", name: "Cheating on Exams", severity: "high", standardPunishment: "Course failure, Academic probation" },
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
  { id: "a5", name: "Multiple Submission", severity: "low", standardPunishment: "Warning, Resubmission required" },
  {
    id: "b1",
    name: "Disruptive Behavior",
    severity: "medium",
    standardPunishment: "Disciplinary probation, Community service",
  },
  { id: "b2", name: "Harassment", severity: "high", standardPunishment: "Suspension, Mandatory counseling" },
  { id: "b3", name: "Physical Altercation", severity: "high", standardPunishment: "Suspension or expulsion" },
]

const severityColors = {
  low: "bg-blue-50 text-blue-700 border-blue-100",
  medium: "bg-amber-50 text-amber-700 border-amber-100",
  high: "bg-red-50 text-red-700 border-red-100",
}

interface OffenceListProps {
  searchQuery: string
  severityFilter: string
  // sortBy and sortDirection are not used in this simplified version but kept for potential future use
  // sortBy: string
  // sortDirection: "asc" | "desc"
  // onSelectOffence: (offenceId: string) => void // Not used if details are handled by dialogs
}

export function OffenceList({ searchQuery, severityFilter }: OffenceListProps) {
  const [currentOffences, setCurrentOffences] = useState<Offence[]>(initialOffencesData)
  const [sortColumn, setSortColumn] = useState<keyof Offence | null>("name")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")

  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editingOffence, setEditingOffence] = useState<Offence | null>(null)

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deletingOffence, setDeletingOffence] = useState<Offence | null>(null)

  const handleEditClick = (offence: Offence) => {
    setEditingOffence(offence)
    setShowEditDialog(true)
  }

  const handleSaveEdit = (updatedOffence: Offence) => {
    setCurrentOffences((prevOffences) => prevOffences.map((o) => (o.id === updatedOffence.id ? updatedOffence : o)))
    setShowEditDialog(false)
    setEditingOffence(null)
  }

  const handleDeleteClick = (offence: Offence) => {
    setDeletingOffence(offence)
    setShowDeleteDialog(true)
  }

  const handleConfirmDelete = () => {
    if (deletingOffence) {
      setCurrentOffences((prevOffences) => prevOffences.filter((o) => o.id !== deletingOffence.id))
    }
    setShowDeleteDialog(false)
    setDeletingOffence(null)
  }

  const filteredOffences = currentOffences.filter((offence) => {
    const matchesSearch =
      searchQuery === "" ||
      offence.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offence.standardPunishment.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSeverity = severityFilter === "all" || offence.severity === severityFilter
    return matchesSearch && matchesSeverity
  })

  const sortedOffences = [...filteredOffences].sort((a, b) => {
    if (!sortColumn) return 0
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDir === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }
    return 0
  })

  const handleSort = (column: keyof Offence) => {
    if (sortColumn === column) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDir("asc")
    }
  }

  return (
    <>
      <Card className="border shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="cursor-pointer hover:bg-gray-100 w-[300px]" onClick={() => handleSort("name")}>
                  Offence
                  {sortColumn === "name" && <span className="ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>}
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-100 w-[150px]"
                  onClick={() => handleSort("severity")}
                >
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
                    No offences found.
                  </TableCell>
                </TableRow>
              ) : (
                sortedOffences.map((offence) => (
                  <TableRow key={offence.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{offence.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("capitalize", severityColors[offence.severity])}>
                        {offence.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>{offence.standardPunishment}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleEditClick(offence)}
                        >
                          <Edit2 className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleDeleteClick(offence)}
                        >
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

      {editingOffence && (
        <EditOffenceDialog
          isOpen={showEditDialog}
          onClose={() => {
            setShowEditDialog(false)
            setEditingOffence(null)
          }}
          offence={editingOffence}
          onSave={handleSaveEdit}
        />
      )}

      {deletingOffence && (
        <DeleteOffenceConfirmationDialog
          isOpen={showDeleteDialog}
          onClose={() => {
            setShowDeleteDialog(false)
            setDeletingOffence(null)
          }}
          offence={deletingOffence}
          onConfirmDelete={handleConfirmDelete}
        />
      )}
    </>
  )
}
