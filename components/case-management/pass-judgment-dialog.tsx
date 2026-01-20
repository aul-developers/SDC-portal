"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, AlertTriangle, BookOpen, Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { getRecommendedPunishment } from "@/components/punishment-tracker/punishment-handbook";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

// Mock list of standard punishments - in a real app, this might come from the offence directory
const standardPunishments = [
  "Warning",
  "Academic Probation",
  "Suspension (1 Semester)",
  "Suspension (1 Academic Year)",
  "Expulsion",
  "Community Service",
  "Mandatory Workshop",
  "Fine",
  "Resubmission of Work",
];

export interface JudgmentData {
  punishmentType: string;
  duration: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  additionalRequirements: string;
  judgmentNotes: string;
}

interface PassJudgmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseId: number; // Changed to number to match database
  studentName: string;
  matricNumber: string; // Added for punishment record
  department: string; // Added for punishment record
  level: string; // Added for punishment record
  currentOffenceType: string; // To provide context
  currentPunishment?: Partial<JudgmentData>; // To pre-fill if editing or re-judging
  onSaveJudgment: (judgmentData: JudgmentData, punishmentId?: number) => void;
}

export function PassJudgmentDialog({
  open,
  onOpenChange,
  caseId,
  studentName,
  matricNumber,
  department,
  level,
  currentOffenceType,
  currentPunishment,
  onSaveJudgment,
}: PassJudgmentDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [punishmentType, setPunishmentType] = useState(
    currentPunishment?.punishmentType || "",
  );
  const [duration, setDuration] = useState(currentPunishment?.duration || "");
  const [startDate, setStartDate] = useState<Date | undefined>(
    currentPunishment?.startDate,
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    currentPunishment?.endDate,
  );
  const [additionalRequirements, setAdditionalRequirements] = useState(
    currentPunishment?.additionalRequirements || "",
  );
  const [judgmentNotes, setJudgmentNotes] = useState(
    currentPunishment?.judgmentNotes || "",
  );

  useEffect(() => {
    if (currentPunishment) {
      setPunishmentType(currentPunishment.punishmentType || "");
      setDuration(currentPunishment.duration || "");
      setStartDate(currentPunishment.startDate);
      setEndDate(currentPunishment.endDate);
      setAdditionalRequirements(currentPunishment.additionalRequirements || "");
      setJudgmentNotes(currentPunishment.judgmentNotes || "");
    } else {
      // Reset form when dialog opens for a new judgment
      setPunishmentType("");
      setDuration("");
      setStartDate(undefined);
      setEndDate(undefined);
      setAdditionalRequirements("");
      setJudgmentNotes("");
    }
  }, [currentPunishment, open]);

  const handleSubmit = async () => {
    if (!punishmentType || !startDate || !endDate) {
      toast.error("Please fill in Punishment Type, Start Date, and End Date.");
      return;
    }

    setIsSubmitting(true);
    const supabase = createClient();

    try {
      // Create punishment record
      const punishmentData = {
        matric_no: matricNumber,
        full_name: studentName,
        department: department,
        level: level,
        punishment_type: punishmentType,
        punishment_title: `${punishmentType} - ${currentOffenceType}`,
        severity_level: "medium", // You may want to make this selectable
        description:
          judgmentNotes || `Punishment assigned for ${currentOffenceType}`,
        start_date: format(startDate, "yyyy-MM-dd"),
        end_date: format(endDate, "yyyy-MM-dd"),
        duration_type: duration,
        requirements: additionalRequirements,
        related_cases: [caseId.toString()],
        case_id: caseId,
        status: "Active",
      };

      const { data: punishment, error: punishmentError } = await supabase
        .from("punishments")
        .insert(punishmentData)
        .select()
        .single();

      if (punishmentError) throw punishmentError;

      // Update case status to Resolved and link to punishment
      const { error: caseError } = await supabase
        .from("cases")
        .update({
          status: "Resolved",
          punishment_id: punishment.id,
        })
        .eq("id", caseId);

      if (caseError) throw caseError;

      toast.success("Judgment passed and punishment created successfully");

      onSaveJudgment(
        {
          punishmentType,
          duration,
          startDate,
          endDate,
          additionalRequirements,
          judgmentNotes,
        },
        punishment.id,
      );

      onOpenChange(false);
    } catch (error: any) {
      console.error("Error creating punishment:", error);
      toast.error(error.message || "Failed to create punishment");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get recommended punishment from handbook
  const recommendedPunishment = getRecommendedPunishment(currentOffenceType);

  const applyRecommendedPunishment = () => {
    if (recommendedPunishment) {
      setPunishmentType(recommendedPunishment);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Pass Judgment: Case {caseId}</DialogTitle>
          <DialogDescription>
            Assign punishment for {studentName} regarding the offence of "
            {currentOffenceType}".
          </DialogDescription>
        </DialogHeader>

        {/* Handbook Recommendation Section */}
        {recommendedPunishment && (
          <div className="rounded-lg border border-sdc-blue/30 bg-sdc-blue/5 p-4 space-y-2">
            <div className="flex items-center gap-2 text-sdc-blue">
              <BookOpen className="h-4 w-4" />
              <span className="font-medium text-sm">
                Handbook Recommendation
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                Recommended for <strong>{currentOffenceType}</strong>:
              </span>
            </div>
            <div className="flex items-center justify-between">
              <Badge className="bg-sdc-blue text-white">
                {recommendedPunishment}
              </Badge>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={applyRecommendedPunishment}
                className="text-xs"
              >
                Apply Recommendation
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="punishmentType" className="text-right">
              Punishment Type
            </Label>
            <Select value={punishmentType} onValueChange={setPunishmentType}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select punishment type" />
              </SelectTrigger>
              <SelectContent>
                {standardPunishments.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
                <SelectItem value="Other">Other (Specify Below)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {punishmentType === "Other" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customPunishmentType" className="text-right">
                Custom Type
              </Label>
              <Input
                id="customPunishmentType"
                value={punishmentType} // This should be a different state if you want to keep "Other" selected
                // and have a separate input for the custom type.
                // For simplicity, reusing punishmentType here means "Other" will be overwritten.
                onChange={(e) => setPunishmentType(e.target.value)}
                className="col-span-3"
                placeholder="Specify custom punishment type"
              />
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">
              Duration
            </Label>
            <Input
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="col-span-3"
              placeholder="e.g., 1 Semester, 30 Days"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startDate" className="text-right">
              Start Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "col-span-3 justify-start text-left font-normal",
                    !startDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endDate" className="text-right">
              End Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "col-span-3 justify-start text-left font-normal",
                    !endDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="additionalRequirements" className="text-right">
              Additional Requirements
            </Label>
            <Textarea
              id="additionalRequirements"
              value={additionalRequirements}
              onChange={(e) => setAdditionalRequirements(e.target.value)}
              className="col-span-3"
              placeholder="e.g., Attend workshop, write apology letter"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="judgmentNotes" className="text-right">
              Judgment Notes
            </Label>
            <Textarea
              id="judgmentNotes"
              value={judgmentNotes}
              onChange={(e) => setJudgmentNotes(e.target.value)}
              className="col-span-3"
              placeholder="Reasoning for the judgment, committee decision, etc."
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            className="bg-sdc-blue hover:bg-sdc-blue/90 text-white"
            disabled={isSubmitting}
          >
            <AlertTriangle className="mr-2 h-4 w-4" />
            {isSubmitting ? "Submitting Judgment..." : "Submit Judgment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
