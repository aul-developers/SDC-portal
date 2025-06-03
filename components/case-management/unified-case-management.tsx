"use client"

import { useState, useCallback } from "react"
import { UnifiedCaseList } from "./unified-case-list"
import { CaseDetails } from "./case-details"
import { GroupedCaseDetails } from "./grouped-case-details"
import { CreateCaseForm } from "./create-case-form"
import { CreateGroupedCaseForm } from "./create-grouped-case-form"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { PlusCircle, X, ChevronDown } from "lucide-react"

export function UnifiedCaseManagement() {
  const [selectedCase, setSelectedCase] = useState<{ id: string; type: "individual" | "grouped" } | null>(null)
  const [activeView, setActiveView] = useState<"list" | "details" | "create-individual" | "create-grouped">("list")

  const handleViewDetails = useCallback((caseId: string, type: "individual" | "grouped") => {
    setSelectedCase({ id: caseId, type })
    setActiveView("details")
  }, [])

  const handleCreateIndividualCase = useCallback(() => {
    setActiveView("create-individual")
  }, [])

  const handleCreateGroupedCase = useCallback(() => {
    setActiveView("create-grouped")
  }, [])

  const handleBack = useCallback(() => {
    setActiveView("list")
    setSelectedCase(null)
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
              <h2 className="text-2xl font-semibold text-sdc-navy">Case Details</h2>
              <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
                <X className="h-4 w-4" /> Close
              </Button>
            </div>
            {selectedCase?.type === "individual" ? (
              <CaseDetails caseId={selectedCase.id} />
            ) : selectedCase?.type === "grouped" ? (
              <GroupedCaseDetails caseId={selectedCase.id} />
            ) : null}
          </div>
        )
      case "create-individual":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-sdc-navy">Create Individual Case</h2>
              <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
                <X className="h-4 w-4" /> Cancel
              </Button>
            </div>
            <CreateCaseForm onSuccess={handleCreateSuccess} />
          </div>
        )
      case "create-grouped":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-sdc-navy">Create Grouped Case</h2>
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
                <h1 className="text-2xl font-semibold text-sdc-navy">Case Management</h1>
                <p className="mt-2 text-sm text-sdc-gray">
                  View, search, and manage all disciplinary cases in the system.
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-sdc-blue hover:bg-sdc-blue/90 text-white gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Create New Case
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={handleCreateIndividualCase}>Individual Case</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleCreateGroupedCase}>Grouped Case</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <UnifiedCaseList onViewDetails={handleViewDetails} />
          </div>
        )
    }
  }

  return <div className="min-h-screen bg-gray-50/50 p-6 lg:p-8">{renderContent()}</div>
}
