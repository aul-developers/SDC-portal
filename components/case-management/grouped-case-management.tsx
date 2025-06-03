"use client"

import { useState, useCallback } from "react"
import { GroupedCaseList } from "./grouped-case-list"
import { GroupedCaseDetails } from "./grouped-case-details"
import { CreateGroupedCaseForm } from "./create-grouped-case-form"
import { Button } from "@/components/ui/button"
import { PlusCircle, X } from "lucide-react"

export function GroupedCaseManagement() {
  const [selectedGroupedCase, setSelectedGroupedCase] = useState<string | null>(null)
  const [activeView, setActiveView] = useState<"list" | "details" | "create">("list")

  const handleViewDetails = useCallback((groupedCaseId: string) => {
    setSelectedGroupedCase(groupedCaseId)
    setActiveView("details")
  }, [])

  const handleCreateGroupedCase = useCallback(() => {
    setActiveView("create")
  }, [])

  const handleBack = useCallback(() => {
    setActiveView("list")
  }, [])

  const handleCreateSuccess = useCallback(() => {
    setActiveView("list")
  }, [])

  const renderContent = () => {
    switch (activeView) {
      case "details":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-sdc-navy">Grouped Case Details</h2>
              <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
                <X className="h-4 w-4" /> Close
              </Button>
            </div>
            {selectedGroupedCase && <GroupedCaseDetails groupedCaseId={selectedGroupedCase} />}
          </div>
        )
      case "create":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-sdc-navy">Create New Grouped Case</h2>
              <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
                <X className="h-4 w-4" /> Cancel
              </Button>
            </div>
            <CreateGroupedCaseForm onSuccess={handleCreateSuccess} />
          </div>
        )
      default:
        return (
          <div className="space-y-6">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div>
                <h1 className="text-2xl font-semibold text-sdc-navy">Grouped Case Management</h1>
                <p className="mt-2 text-sm text-sdc-gray">
                  View and manage cases involving multiple students or related incidents.
                </p>
              </div>
              <Button onClick={handleCreateGroupedCase} className="bg-sdc-blue hover:bg-sdc-blue/90 text-white">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Grouped Case
              </Button>
            </div>
            <GroupedCaseList onViewDetails={handleViewDetails} />
          </div>
        )
    }
  }

  return <div className="min-h-screen bg-gray-50/50 p-6 lg:p-8">{renderContent()}</div>
}
