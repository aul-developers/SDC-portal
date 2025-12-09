"use client";

import { useState, useCallback } from "react";
import { PunishmentDetails } from "./punishment-details";
import { PunishmentMetrics } from "./punishment-metrics";
import { UpdatePunishmentForm } from "./update-punishment-form";
import { AddPunishmentDialog } from "./add-punishment-dialog";
import { Button } from "@/components/ui/button";
import { X, Plus, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PunishmentStatusTabs } from "./punishment-status-tabs";

import { API_ENDPOINTS } from "@/app/_data/api-constants";

export function PunishmentTracker() {
  const [selectedPunishment, setSelectedPunishment] = useState<string | null>(
    null
  );
  const [activeView, setActiveView] = useState<"list" | "details" | "update">(
    "list"
  );
  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleViewDetails = useCallback((punishmentId: string) => {
    setSelectedPunishment(punishmentId);
    setActiveView("details");
  }, []);

  const handleUpdatePunishment = useCallback((punishmentId: string) => {
    setSelectedPunishment(punishmentId);
    setActiveView("update");
  }, []);

  const handleBack = useCallback(() => {
    setActiveView("list");
  }, []);

  const handleUpdateSuccess = useCallback(() => {
    setActiveView("details");
  }, []);

  const handleAddPunishmentSuccess = useCallback(() => {
    // Refresh the punishment list or show success message
    // You could trigger a refresh of the punishment data here
  }, []);

  const handlePunishmentAdded = () => {
    // Refresh the punishment list or update state
  };

  const renderContent = () => {
    switch (activeView) {
      case "details":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-sdc-navy">
                Punishment Details
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="gap-2"
              >
                <X className="h-4 w-4" /> Close
              </Button>
            </div>
            {selectedPunishment && (
              <PunishmentDetails
                punishmentId={selectedPunishment}
                onUpdatePunishment={handleUpdatePunishment}
              />
            )}
          </div>
        );
      case "update":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-sdc-navy">
                Update Punishment Status
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="gap-2"
              >
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
        );
      default:
        return (
          <>
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Scale className="h-8 w-8 text-sdc-blue" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Punishment Tracker
                  </h1>
                  <p className="text-gray-600">
                    Monitor and manage disciplinary actions
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setShowAddDialog(true)}
                className="bg-sdc-blue hover:bg-sdc-blue/90 text-white gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Punishment
              </Button>
            </div>

            {/* Metrics */}
            <PunishmentMetrics />

            {/* Status Tabs */}
            <Card>
              <CardHeader>
                <CardTitle>Punishment Management</CardTitle>
              </CardHeader>
              <CardContent>
                <PunishmentStatusTabs onViewDetails={handleViewDetails} />
              </CardContent>
            </Card>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {renderContent()}

      {/* Add Punishment Dialog */}
      <AddPunishmentDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={handleAddPunishmentSuccess}
      />
    </div>
  );
}
