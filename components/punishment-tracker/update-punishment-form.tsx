"use client";

import type React from "react";

import { useState } from "react";
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
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

// Mock punishment data (same as in PunishmentDetails)
const mockPunishmentDetails = {
  id: "PUN-2024-001",
  student: {
    name: "Robert Chen",
    matricNumber: "STU-45789",
    department: "Computer Science",
    level: "300 Level",
    image: "/monogram-mb.png",
  },
  case: {
    id: "SDC-2024-091",
    offence: "Academic Dishonesty",
    description:
      "Plagiarism detected in final term paper for CSC301 - Software Engineering.",
  },
  type: "Academic Probation",
  duration: "1 Semester",
  startDate: "2024-05-15",
  endDate: "2024-09-15",
  status: "Active",
  progress: 25,
  requirements:
    "Must attend academic integrity workshop and resubmit the paper.",
  verificationRequired: true,
  verificationStatus: "pending",
  notes:
    "Student has shown remorse and willingness to comply with the requirements.",
  milestones: [
    {
      id: "MS-001",
      title: "Academic Integrity Workshop",
      dueDate: "2024-06-15",
      status: "completed",
      completedDate: "2024-06-10",
      verifiedBy: "Dr. Sarah Johnson",
    },
    {
      id: "MS-002",
      title: "Resubmit Paper",
      dueDate: "2024-07-15",
      status: "pending",
      completedDate: null,
      verifiedBy: null,
    },
    {
      id: "MS-003",
      title: "Mid-term Review",
      dueDate: "2024-07-30",
      status: "pending",
      completedDate: null,
      verifiedBy: null,
    },
    {
      id: "MS-004",
      title: "Final Review",
      dueDate: "2024-09-10",
      status: "pending",
      completedDate: null,
      verifiedBy: null,
    },
  ],
};

interface UpdatePunishmentFormProps {
  punishmentId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function UpdatePunishmentForm({
  punishmentId,
  onSuccess,
  onCancel,
}: UpdatePunishmentFormProps) {
  // In a real application, you would fetch the punishment details based on the punishmentId
  // For this example, we'll use the mock data
  const punishment = mockPunishmentDetails;

  const [progress, setProgress] = useState(punishment.progress.toString());
  const [status, setStatus] = useState(punishment.status);
  const [notes, setNotes] = useState("");
  const [completedDate, setCompletedDate] = useState<Date | undefined>(
    undefined
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMilestones, setSelectedMilestones] = useState<string[]>([]);

  const handleMilestoneToggle = (milestoneId: string) => {
    setSelectedMilestones((prev) =>
      prev.includes(milestoneId)
        ? prev.filter((id) => id !== milestoneId)
        : [...prev, milestoneId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus} required>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Update Notes</Label>
              <Textarea
                id="notes"
                placeholder="Enter notes about this update"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px]"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-sdc-blue hover:bg-sdc-blue/90 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Punishment"}
        </Button>
      </div>
    </form>
  );
}
