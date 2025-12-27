"use client";

import type React from "react";

import { useState } from "react";
import { useAuth } from "@/app/context/auth-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

import { cn, generateErrorMessage, postRequest } from "@/lib/utils";
import {
  CalendarIcon,
  Plus,
  X,
  User,
  FileText,
  Clock,
  AlertTriangle,
  Scale,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { PunishmentRecommendation } from "./punishment-recommendation";
import {
  predictPunishment,
  type PunishmentPrediction,
} from "@/utils/punishment-predictor";
import { Sparkles } from "lucide-react";

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date | undefined;
  required: boolean;
}

interface AddPunishmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function AddPunishmentDialog({
  open,
  onOpenChange,
  onSuccess,
}: AddPunishmentDialogProps) {
  const { user } = useAuth();
  // Basic punishment information
  const [punishmentType, setPunishmentType] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("");
  const [priority, setPriority] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Duration and dates
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [duration, setDuration] = useState("");
  const [durationType, setDurationType] = useState("");

  // Case information
  const [caseIds, setCaseIds] = useState<string[]>([]);
  const [currentCaseId, setCurrentCaseId] = useState("");

  // Requirements and conditions
  const [requirements, setRequirements] = useState("");
  const [conditions, setConditions] = useState("");

  const addCaseId = () => {
    if (
      currentCaseId.trim() &&
      !caseIds.includes(currentCaseId.trim().toUpperCase())
    ) {
      setCaseIds([...caseIds, currentCaseId.trim().toUpperCase()]);
      setCurrentCaseId("");
    }
  };
  const removeCaseId = (caseId: string) => {
    setCaseIds(caseIds.filter((id) => id !== caseId));
  };

  const handleCaseIdKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCaseId();
    }
  };

  function handleStartDate(Date: string) {
    setStartDate(Date);
  }
  function handleEndDate(Date: string) {
    setEndDate(Date);
  }

  // AI State
  const [aiPrediction, setAiPrediction] = useState<PunishmentPrediction | null>(
    null
  );

  // Function to trigger AI
  const handleGenerateAiSuggestion = () => {
    if (!title && !description) {
      toast.info("Please enter a title or description for the AI to analyze.");
      return;
    }

    const prediction = predictPunishment(title, description);
    if (prediction) {
      setAiPrediction(prediction);
      toast.success("AI has generated a suggestion!");
    } else {
      toast.info("AI could not determine a specific punishment pattern.");
    }
  };

  const applyAiPrediction = (prediction: PunishmentPrediction) => {
    setPunishmentType(prediction.type);
    setTitle(prediction.title);
    setDescription(prediction.description);
    setSeverity(prediction.severity);
    setAiPrediction(null);
    toast.success("AI suggestion applied!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const supabase = createClient();

    const formmattedStartDate = startDate && format(startDate, "yyyy-MM-dd");
    const formmattedEndDate = endDate && format(endDate, "yyyy-MM-dd");

    const punishmentData = {
      matric_no: matricNumber,
      full_name: fullName,
      department,
      punishment_type: punishmentType,
      severity_level: severity,
      punishment_title: title,
      level: level,
      description,
      start_date: formmattedStartDate, // mapped from start_time
      end_date: formmattedEndDate, // mapped from end_time
      duration_type: durationType,
      requirements,
      add_conditions: conditions,
      related_cases: caseIds, // Storing array of strings directly or as json
      status: "Active",
    };

    // Board Member - Request Approval
    if (user?.role === "board_member") {
      const requestData = {
        ...punishmentData,
        status: "PENDING_APPROVAL", // Explicitly mark it
      };

      const { error: approvalError } = await supabase
        .from("approval_requests")
        .insert({
          request_type: "ADD_PUNISHMENT",
          request_data: requestData,
          requester_id: user.id,
        });

      if (approvalError) {
        toast.error(
          "Failed to submit approval request: " + approvalError.message
        );
      } else {
        toast.success("Punishment request submitted for Super Admin approval.");
        onSuccess();
        onOpenChange(false);
        resetForm();
      }
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase
        .from("punishments")
        .insert(punishmentData);

      if (error) throw error;

      toast.success("Punishment added successfully");
      onSuccess();
      onOpenChange(false);
      resetForm();
    } catch (error: any) {
      const errorMessage = error.message || "Failed to add punishment";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setPunishmentType("");
    setTitle("");
    setDescription("");
    setLevel("");
    setSeverity("");
    setPriority("");
    setStartDate(undefined);
    setEndDate(undefined);
    setDuration("");
    setDurationType("");
    setCaseIds([]);
    setCurrentCaseId("");
    setRequirements("");
    setConditions("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Scale className="h-5 w-5 text-sdc-blue" />
            Add New Punishment
          </DialogTitle>
          <Button
            size="sm"
            variant="ghost"
            className="text-violet-600 gap-1 bg-violet-50 hover:bg-violet-100"
            onClick={handleGenerateAiSuggestion}
          >
            <Sparkles className="h-4 w-4" /> Ask AI
          </Button>
        </DialogHeader>

        {aiPrediction && (
          <PunishmentRecommendation
            prediction={aiPrediction}
            onAccept={applyAiPrediction}
            onDismiss={() => setAiPrediction(null)}
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Punishment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-sdc-blue" />
                Basic Punishment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="appeal-period">Matric No</Label>
                  <Input
                    id="matric_no"
                    type="text"
                    value={matricNumber}
                    onChange={(e) => setMatricNumber(e.target.value)}
                    placeholder="e.g., AUL/SMS/22/043"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appeal-period">Full Name</Label>
                  <Input
                    id="full_name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder=""
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="punishment-type">Department *</Label>
                  <Select
                    value={department}
                    onValueChange={setDepartment}
                    required
                  >
                    <SelectTrigger id="punishment-type">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computing">Computing</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Law">Law</SelectItem>
                      <SelectItem value="Nursing">Nursing</SelectItem>
                      <SelectItem value="Architechture">
                        Architechture
                      </SelectItem>
                      <SelectItem value="Accounting">Accounting</SelectItem>
                      <SelectItem value="ass Communication">
                        Mass Communication
                      </SelectItem>
                      <SelectItem value="Business Admin">
                        Business Admin
                      </SelectItem>
                      <SelectItem value="International Relations">
                        International Relations
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appeal-period">Level</Label>
                  <Input
                    id="level"
                    type="text"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    placeholder="Level when this punishment is being initited"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="punishment-type">Punishment Type *</Label>
                  <Select
                    value={punishmentType}
                    onValueChange={setPunishmentType}
                    required
                  >
                    <SelectTrigger id="punishment-type">
                      <SelectValue placeholder="Select punishment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="written_warning">
                        Written Warning
                      </SelectItem>
                      <SelectItem value="academic_probation">
                        Academic Probation
                      </SelectItem>
                      <SelectItem value="disciplinary_probation">
                        Disciplinary Probation
                      </SelectItem>
                      <SelectItem value="suspension">Suspension</SelectItem>
                      <SelectItem value="expulsion">Expulsion</SelectItem>
                      <SelectItem value="grade_reduction">
                        Grade Reduction
                      </SelectItem>
                      <SelectItem value="restitution">Restitution</SelectItem>
                      <SelectItem value="community_service">
                        Community Service
                      </SelectItem>
                      <SelectItem value="counseling">
                        Mandatory Counseling
                      </SelectItem>
                      <SelectItem value="research_integrity_training">
                        Research Integrity Training
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="severity">Severity Level *</Label>
                  <Select value={severity} onValueChange={setSeverity} required>
                    <SelectTrigger id="severity">
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Punishment Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Academic Probation for Plagiarism"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed description of the punishment and its implications"
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Duration and Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-sdc-blue" />
                Duration and Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date *</Label>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <input
                      type="date"
                      onChange={(e) => handleStartDate(e.target.value)}
                    />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>

                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <input
                        type="date"
                        onChange={(e) => handleEndDate(e.target.value)}
                      />
                    </Button>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration-type">Duration Type</Label>
                  <Select value={durationType} onValueChange={setDurationType}>
                    <SelectTrigger id="duration-type">
                      <SelectValue placeholder="Select duration type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="days">Days</SelectItem>
                      <SelectItem value="weeks">Weeks</SelectItem>
                      <SelectItem value="months">Months</SelectItem>
                      <SelectItem value="semesters">Semesters</SelectItem>
                      <SelectItem value="academic_years">
                        Academic Years
                      </SelectItem>
                      <SelectItem value="permanent">Permanent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Cases */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-sdc-blue" />
                Related Cases *
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="case-id-input">Enter Case ID</Label>
                <div className="flex gap-2">
                  <Input
                    id="case-id-input"
                    value={currentCaseId}
                    onChange={(e) => setCurrentCaseId(e.target.value)}
                    onKeyPress={handleCaseIdKeyPress}
                    placeholder="e.g., SDC-2024-091 or GRP-2024-001"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={addCaseId}
                    size="sm"
                    className="gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter case IDs one by one. Press Enter or click Add to include
                  each case.
                </p>
              </div>

              {caseIds.length > 0 && (
                <div className="space-y-2">
                  <Label>Added Cases ({caseIds.length})</Label>
                  <div className="flex flex-wrap gap-2">
                    {caseIds.map((caseId) => (
                      <Badge key={caseId} variant="secondary" className="gap-1">
                        {caseId}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeCaseId(caseId)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Requirements and Conditions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="h-5 w-5 text-sdc-blue" />
                Requirements and Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements *</Label>
                <Textarea
                  id="requirements"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Specific requirements the student must fulfill"
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="conditions">Additional Conditions</Label>
                <Textarea
                  id="conditions"
                  value={conditions}
                  onChange={(e) => setConditions(e.target.value)}
                  placeholder="Additional conditions or restrictions"
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-sdc-blue hover:bg-sdc-blue/90 text-white"
              disabled={isSubmitting || caseIds.length === 0}
            >
              {isSubmitting ? "Creating Punishment..." : "Create Punishment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
