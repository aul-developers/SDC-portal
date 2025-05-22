"use client"

import { useState, useCallback } from "react"
import { EnhancedStudentList } from "./enhanced-student-list"
import { StudentProfile } from "./student-profile"
import { StudentCaseHistory } from "./student-case-history"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function StudentRecords() {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [activeView, setActiveView] = useState<"list" | "profile" | "caseHistory">("list")

  const handleViewProfile = useCallback((matricNumber: string) => {
    setSelectedStudent(matricNumber)
    setActiveView("profile")
  }, [])

  const handleViewCaseHistory = useCallback((matricNumber: string) => {
    setSelectedStudent(matricNumber)
    setActiveView("caseHistory")
  }, [])

  const handleBack = useCallback(() => {
    setActiveView("list")
  }, [])

  // Render the appropriate view based on the activeView state
  const renderContent = () => {
    switch (activeView) {
      case "profile":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-sdc-navy">Student Profile</h2>
              <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
                <X className="h-4 w-4" /> Close
              </Button>
            </div>
            {selectedStudent && <StudentProfile matricNumber={selectedStudent} />}
          </div>
        )
      case "caseHistory":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-sdc-navy">Case History</h2>
              <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
                <X className="h-4 w-4" /> Close
              </Button>
            </div>
            {selectedStudent && <StudentCaseHistory matricNumber={selectedStudent} />}
          </div>
        )
      default:
        return (
          <>
            <div>
              <h1 className="text-2xl font-semibold text-sdc-navy">Student Records</h1>
              <p className="mt-1 text-sm text-sdc-gray">
                View and manage student information and disciplinary records.
              </p>
            </div>
            <EnhancedStudentList onViewProfile={handleViewProfile} onViewCaseHistory={handleViewCaseHistory} />
          </>
        )
    }
  }

  return <div className="flex flex-col space-y-6 p-8">{renderContent()}</div>
}
