"use client";

import type React from "react";

import { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import LoadingButton from "@/components/ui/loading-button";
import { postRequest } from "@/lib/utils";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

interface AddOffenceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface offenceFormProps {
  offenceName: string;
  offenceSeverity: "Low" | "Medium" | "High" | string;
  offencePunishment: string;
  offenceSection: string;
}
export type offenceSeverity = "Low" | "Medium" | "High" | string;

interface submitOffenceProps {
  offence: string;
  severity: string;
  punishment: string;
}

export function AddOffenceDialog({
  open,
  onOpenChange,
}: AddOffenceDialogProps) {
  const [offenceForm, setOffenceForm] = useState<offenceFormProps>({
    offenceName: "",
    offenceSeverity: "",
    offencePunishment: "",
    offenceSection: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateOffenceFormField = useCallback(
    (offenceValues: Partial<offenceFormProps>) => {
      setOffenceForm((prevData) => {
        return { ...prevData, ...offenceValues };
      });
    },
    [],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const supabase = createClient();

    const offenceData = {
      offence: offenceForm.offenceName,
      severity: offenceForm.offenceSeverity,
      punishment: offenceForm.offencePunishment,
      handbook_section: offenceForm.offenceSection,
    };

    try {
      const { error } = await supabase
        .from("offences") // Assuming table name is 'offences'
        .insert(offenceData);

      if (error) throw error;

      toast.success("Offence added successfully");

      setOffenceForm({
        offenceName: "",
        offencePunishment: "",
        offenceSeverity: "",
        offenceSection: "",
      });
      onOpenChange(false);
    } catch (error: any) {
      const errorMessage = error.message || "Failed to add offence";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Offence</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="offence-name">Offence Name</Label>
            <Input
              id="offence-name"
              value={offenceForm.offenceName}
              onChange={(e) =>
                handleUpdateOffenceFormField({
                  offenceName: e.target.value,
                })
              }
              placeholder="Enter offence name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="severity">Severity</Label>
            <Select
              value={offenceForm.offenceSeverity}
              onValueChange={(e) =>
                handleUpdateOffenceFormField({
                  offenceSeverity: e,
                })
              }
              required
            >
              <SelectTrigger id="severity">
                <SelectValue placeholder="Select severity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="punishment">Standard Punishment</Label>
            <Textarea
              id="punishment"
              value={offenceForm.offencePunishment}
              onChange={(e) =>
                handleUpdateOffenceFormField({
                  offencePunishment: e.target.value,
                })
              }
              placeholder="Enter standard punishment"
              required
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="offence-section">Handbook Section</Label>
            <Input
              id="offence-section"
              value={offenceForm.offenceSection}
              onChange={(e) =>
                handleUpdateOffenceFormField({
                  offenceSection: e.target.value,
                })
              }
              placeholder="e.g. Section 5.0, Page 12"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            {!isSubmitting ? (
              <Button type="submit" disabled={isSubmitting}>
                Add Offence
              </Button>
            ) : (
              <LoadingButton text="Adding..." />
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
