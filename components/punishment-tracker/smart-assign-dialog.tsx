"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, CheckCircle, BookOpen, FileText, Gavel } from "lucide-react";
import { format, addMonths } from "date-fns";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import {
  getRecommendedPunishment,
  getOffenceDetails,
} from "./punishment-handbook";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CaseData {
  id: number;
  title: string;
  offence_type: string;
  description: string;
  students: Array<{
    full_name: string;
    matric_number: string;
    department: string;
    level: string;
  }>;
}

interface SmartAssignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cases: CaseData[];
  onSuccess: () => void;
}

export function SmartAssignDialog({
  open,
  onOpenChange,
  cases,
  onSuccess,
}: SmartAssignDialogProps) {
  // 1. Hooks unconditionally
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requirements, setRequirements] = useState("");
  const [selectedPunishmentType, setSelectedPunishmentType] = useState("");

  // 2. Safe Derived State
  const primaryCase = cases?.[0];
  const student =
    primaryCase?.students?.[0] ||
    (Array.isArray(primaryCase?.students) ? primaryCase?.students[0] : null);

  const offenceType = primaryCase?.offence_type || "";
  const offenceDetails = getOffenceDetails(offenceType);
  const recommendations = offenceDetails?.recommendedPunishments || [];
  const defaultPunishment =
    getRecommendedPunishment(offenceType) || "Academic Probation";

  // 3. Effects unconditionally
  useEffect(() => {
    if (defaultPunishment && open) {
      // Only update when open to avoid overwrite loop if conditional
      setSelectedPunishmentType(defaultPunishment);
    }
    // Initialize requirements
    if (open) {
      setRequirements(
        `Student must comply with all university regulations during the punishment period. ` +
          `Regular progress reports required.`,
      );
    }
  }, [defaultPunishment, open]);

  // 4. Conditional Rendering (Render Nothing if invalid)
  if (!cases || cases.length === 0 || !primaryCase) {
    return null;
  }

  // From here on, we can assume cases exist due to the early return ABOVE,
  // but since we already called hooks, it's safe.

  const mainOffenceCase = primaryCase; // Alias for clarity if needed

  const startDate = new Date();
  const endDate = addMonths(startDate, 6);

  const handleSubmit = async () => {
    if (!selectedPunishmentType) {
      toast.error("Please select a punishment type");
      return;
    }

    setIsSubmitting(true);
    const supabase = createClient();

    try {
      const allCaseIds = cases.map((c) => c.id.toString());
      const offenceSummary = cases.map((c) => c.offence_type).join(", ");

      const punishmentData = {
        matric_no: student?.matric_number,
        full_name: student?.full_name,
        punishment_type: selectedPunishmentType,
        punishment_title: `${selectedPunishmentType} - ${mainOffenceCase.offence_type}`,
        description: `Punishment assigned for multiple offences: ${offenceSummary}.\n\nPrimary Offence: ${mainOffenceCase.offence_type} (${offenceDetails?.severity || "Standard"}). \n\nRelated Cases:\n${cases.map((c) => `- ${c.offence_type}: ${c.description}`).join("\n")}`,
        start_date: format(startDate, "yyyy-MM-dd"),
        end_date: format(endDate, "yyyy-MM-dd"),
        duration_type: "months",
        requirements: requirements,
        related_cases: allCaseIds,
        case_id: mainOffenceCase.id,
        status: "Active",
      };

      const { data: punishment, error: punishmentError } = await supabase
        .from("punishments")
        .insert(punishmentData)
        .select()
        .single();

      if (punishmentError) throw punishmentError;

      const { error: caseError } = await supabase
        .from("cases")
        .update({
          status: "Resolved",
        })
        .in(
          "id",
          cases.map((c) => c.id),
        );

      if (caseError) throw caseError;

      toast.success("Punishment assigned successfully!");
      onSuccess();
    } catch (error: any) {
      console.error("Error assigning punishment:", error);
      toast.error(error.message || "Failed to assign punishment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gavel className="h-5 w-5 text-sdc-blue" />
            Assign Punishment
          </DialogTitle>
          <DialogDescription>
            Review handbook recommendations and select the appropriate
            disciplinary action.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="rounded-lg border p-4 bg-gray-50">
            <h4 className="font-semibold mb-2">Student Information</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600">Name:</span>
                <p className="font-medium">{student?.full_name}</p>
              </div>
              <div>
                <span className="text-gray-600">Matric No:</span>
                <p className="font-medium">{student?.matric_number}</p>
              </div>
              <div>
                <span className="text-gray-600">Department:</span>
                <p className="font-medium">{student?.department}</p>
              </div>
              <div>
                <span className="text-gray-600">Level:</span>
                <p className="font-medium">{student?.level}</p>
              </div>
            </div>
          </div>

          {offenceDetails && (
            <div className="rounded-lg border p-4 bg-amber-50 border-amber-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Primary Offence: {offenceDetails.type}
                </h4>
                <Badge className="bg-amber-600 hover:bg-amber-700">
                  {offenceDetails.severity}
                </Badge>
              </div>
              <p className="text-sm text-gray-700 italic border-l-2 border-amber-300 pl-2 mb-2">
                "{offenceDetails.description}"
              </p>
              <div className="flex items-center gap-2 text-xs text-amber-800 font-medium bg-amber-100/50 p-1 rounded inline-flex">
                <FileText className="h-3 w-3" />
                Policy Reference: {offenceDetails.policyReference}
              </div>
            </div>
          )}

          <div className="rounded-lg border p-4 bg-white border-violet-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 text-violet-600" />
              <h4 className="font-semibold text-violet-900">
                Recommended Actions (Handbook)
              </h4>
            </div>

            {recommendations.length > 0 ? (
              <RadioGroup
                value={selectedPunishmentType}
                onValueChange={setSelectedPunishmentType}
              >
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-2 border rounded-md p-3 hover:bg-gray-50 cursor-pointer ${selectedPunishmentType === rec.type ? "bg-violet-50 border-violet-200" : "border-gray-200"}`}
                  >
                    <RadioGroupItem
                      value={rec.type}
                      id={`rec-${index}`}
                      className="mt-1"
                    />
                    <div
                      className="flex flex-col cursor-pointer flex-1"
                      onClick={() => setSelectedPunishmentType(rec.type)}
                    >
                      <Label
                        htmlFor={`rec-${index}`}
                        className="font-medium cursor-pointer text-base"
                      >
                        {rec.type}
                      </Label>
                      <span className="text-xs text-gray-500 mt-1">
                        {rec.firstOffence
                          ? "Suggested for First Offence"
                          : "Suggested for Repeat Offence"}
                      </span>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <p className="text-sm text-gray-500 italic">
                No specific recommendations found in handbook. Please enter
                manually.
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg border">
            <div>
              <Label className="text-sm text-gray-700">Start Date</Label>
              <p className="font-medium">{format(startDate, "PPP")}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-700">End Date</Label>
              <p className="font-medium">{format(endDate, "PPP")}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-700">Duration</Label>
              <p className="font-medium">6 months (Default)</p>
            </div>
          </div>

          <div>
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="min-h-[100px] mt-2"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-sdc-blue hover:bg-sdc-blue/90 text-white"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            {isSubmitting ? "Assigning..." : "Confirm & Assign"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
