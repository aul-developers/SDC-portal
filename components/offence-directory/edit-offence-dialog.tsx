"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { Offence } from "./offence-list";
import { offenceFormProps, offenceSeverity } from "./add-offence-dialog";

interface EditOffenceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  offence: Offence | null;
  onSave: (updatedOffence: Offence) => void;
}

interface editFormProps {
  id?: number;
  offenceName: string;
  offenceSeverity: "Low" | "Medium" | "High" | string;
  offencePunishment: string;
}

export function EditOffenceDialog({
  isOpen,
  onClose,
  offence,
  onSave,
}: EditOffenceDialogProps) {
  const [offenceForm, setOffenceForm] = useState<editFormProps>({
    offenceName: "",
    offenceSeverity: "",
    offencePunishment: "",
  });
  const handleUpdateOffenceFormField = useCallback(
    (offenceValues: Partial<editFormProps>) => {
      setOffenceForm((prevData) => {
        return { ...prevData, ...offenceValues };
      });
    },
    []
  );

  useEffect(() => {
    if (offence) {
      handleUpdateOffenceFormField({
        id: offence.id,
        offenceName: offence.offence,
        offenceSeverity: offence.severity,
        offencePunishment: offence.punishment,
      });
    }
  }, [offence]);

  const handleSubmit = () => {
    const editedOffence: Offence = {
      id: offence ? offence.id : 0,
      offence: offenceForm.offenceName,
      severity: offenceForm.offenceSeverity as any,
      punishment: offenceForm.offencePunishment,
    };
    if (!offence) return;
    onSave(editedOffence);
    onClose();
  };

  if (!offence) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Offence</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={offenceForm.offenceName}
              onChange={(e) =>
                handleUpdateOffenceFormField({
                  offenceName: e.target.value,
                })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="severity" className="text-right">
              Severity
            </Label>
            <Select
              value={offenceForm.offenceSeverity}
              onValueChange={(value: "Low" | "Medium" | "High") =>
                handleUpdateOffenceFormField({
                  offenceSeverity: value,
                })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="punishment" className="text-right">
              Standard Punishment
            </Label>
            <Textarea
              id="punishment"
              value={offenceForm.offencePunishment}
              onChange={(e) =>
                handleUpdateOffenceFormField({
                  offencePunishment: e.target.value,
                })
              }
              className="col-span-3"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
