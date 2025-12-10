"use client";

import { useState, useCallback } from "react";
import { UnifiedCaseList } from "./unified-case-list";
import { CaseDetails } from "./case-details";
import { GroupedCaseDetails } from "./grouped-case-details";
import { CreateCaseForm, caseFormSchema } from "./create-case-form";
import { CreateGroupedCaseForm } from "./create-grouped-case-form";
import { Button } from "@/components/ui/button";
import { Case } from "@/app/_types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { PlusCircle, X, ChevronDown } from "lucide-react";

export function UnifiedCaseManagement() {
  const [selectedCase, setSelectedCase] = useState<{
    id: number;
    type: "Individual" | "Grouped";
  } | null>(null);
  const [selectedCaseData, setSelectedCaseData] =
    useState<caseFormSchema | null>(null);
  const [activeView, setActiveView] = useState<
    | "list"
    | "details"
    | "create-individual"
    | "create-grouped"
    | "edit-individual"
  >("list");

  const handleViewDetails = useCallback(
    (caseId: number, type: "Individual" | "Grouped") => {
      setSelectedCase({ id: caseId, type });
      setActiveView("details");
    },
    []
  );

  const handleCreateIndividualCase = useCallback(() => {
    setActiveView("create-individual");
  }, []);

  const handleCreateGroupedCase = useCallback(() => {
    setActiveView("create-grouped");
  }, []);

  const handleBack = useCallback(() => {
    setActiveView("list");
    setSelectedCase(null);
    setSelectedCaseData(null);
  }, []);

  const handleEdit = useCallback((caseItem: Case) => {
    // Map existing case data to form schema
    // Note: Some fields are mocked because they don't exist on the Case type yet
    const formData: caseFormSchema = {
      id: caseItem.id,
      title: caseItem.title,
      offence_type: caseItem.offence_type,
      description: caseItem.description || "",
      incident_date: caseItem.incident_date,
      case_type:
        (caseItem.case_type as "Individual" | "Grouped") || "Individual",
      incident_time: "12:00", // Default/Mock
      reported_by: "System Administrator", // Default/Mock
      location: "Campus", // Default/Mock
      position: "Admin", // Default/Mock
      priority: caseItem.priority || "Medium",
      reporter_mail: "admin@aul.edu.ng", // Default/Mock
      reporters_phone: "",
      students: caseItem.students.map((s) => ({
        full_name: s.full_name,
        matric_number: s.matric_number,
        department: s.department || "Computer Science",
        faculty: "Science", // Default/Mock
        level: s.level || "100",
        email: s.email || "",
        phone: "", // Default/Mock
      })),
    };

    setSelectedCaseData(formData);
    if (caseItem.case_type === "Grouped") {
      // TODO: Add support for editing grouped cases
      alert("Editing grouped cases is coming soon");
    } else {
      setActiveView("edit-individual");
    }
  }, []);

  const handleCreateSuccess = useCallback(() => {
    setActiveView("list");
  }, []);

  const renderContent = () => {
    switch (activeView) {
      case "details":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-sdc-navy">
                Case Details
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
            {selectedCase?.type === "Individual" ? (
              <CaseDetails caseId={selectedCase.id} />
            ) : selectedCase?.type === "Grouped" ? (
              <GroupedCaseDetails groupedCaseId={selectedCase.id} />
            ) : null}
          </div>
        );
      case "create-individual":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-sdc-navy">
                Create Individual Case
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
            <CreateCaseForm onSuccess={handleCreateSuccess} />
          </div>
        );
      case "edit-individual":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-sdc-navy">
                Edit Individual Case
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
            <CreateCaseForm
              onSuccess={handleCreateSuccess}
              initialData={selectedCaseData || undefined}
            />
          </div>
        );
      case "create-grouped":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-sdc-navy">
                Create Grouped Case
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
            <CreateGroupedCaseForm onSuccess={handleCreateSuccess} />
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div>
                <h1 className="text-2xl font-semibold text-sdc-navy">
                  Case Management
                </h1>
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
                  <DropdownMenuItem onClick={handleCreateIndividualCase}>
                    Individual Case
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleCreateGroupedCase}>
                    Grouped Case
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <UnifiedCaseList
              onViewDetails={handleViewDetails}
              onEdit={handleEdit}
            />
          </div>
        );
    }
  };

  return <>{renderContent()}</>;
}
