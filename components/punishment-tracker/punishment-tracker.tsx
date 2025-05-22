"use client"

import { useState, useCallback } from "react"
import { PunishmentDetails } from "./punishment-details"
import { PunishmentMetrics } from "./punishment-metrics"
import { UpdatePunishmentForm } from "./update-punishment-form"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { PunishmentStatusTabs } from "./punishment-status-tabs"

export function PunishmentTracker() {
  const [selectedPunishment, setSelectedPunishment] = useState<string | null>(null)
  const [activeView, setActiveView] = useState<"list" | "details" | "update">("list")

  const handleViewDetails = useCallback((punishmentId: string) => {
    setSelectedPunishment(punishmentId)
    setActiveView("details")
  }, [])

  const handleUpdatePunishment = useCallback((punishmentId: string) => {
    setSelectedPunishment(punishmentId)
    setActiveView("update")
  }, [])

  const handleBack = useCallback(() => {
    setActiveView("list")
  }, [])

  const handleUpdateSuccess = useCallback(() => {
    setActiveView("details")
  }, [])

  // Update the renderContent function to include tabs for the different punishment statuses
  const renderContent = () => {
    switch (activeView) {
      case "details":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-sdc-navy">Punishment Details</h2>
              <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
                <X className="h-4 w-4" /> Close
              </Button>
            </div>
            {selectedPunishment && (
              <PunishmentDetails punishmentId={selectedPunishment} onUpdatePunishment={handleUpdatePunishment} />
            )}
          </div>
        )
      case "update":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-sdc-navy">Update Punishment Status</h2>
              <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
                <X className="h-4 w-4" /> Cancel
              </Button>
            </div>
            {selectedPunishment && (
              <UpdatePunishmentForm
                punishmentId={selectedPunishment}
                onSuccess={handleUpdateSuccess}
                onCancel={() => setActiveView("details")}
              />
            )}
          </div>
        )
      default:
        return (
          <>
            <div>
              <h1 className="text-2xl font-semibold text-sdc-navy">Punishment Tracker</h1>
              <p className="mt-1 text-sm text-sdc-gray">
                Monitor and manage all disciplinary actions across the institution.
              </p>
            </div>
            <PunishmentMetrics />
            <PunishmentStatusTabs onViewDetails={handleViewDetails} />
          </>
        )
    }
  }

  return <div className="flex flex-col space-y-6 p-8">{renderContent()}</div>
}
