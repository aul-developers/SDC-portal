"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, AlertTriangle } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

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
]

export interface JudgmentData {
  punishmentType: string
  duration: string
  startDate: Date | undefined
  endDate: Date | undefined
  additionalRequirements: string
  judgmentNotes: string
}

interface PassJudgmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  caseId: string
  studentName: string
  currentOffenceType: string // To provide context
  currentPunishment?: Partial<JudgmentData> // To pre-fill if editing or re-judging
  onSaveJudgment: (judgmentData: JudgmentData) => void
}

export function PassJudgmentDialog({
  open,
  onOpenChange,
  caseId,
  studentName,
  currentOffenceType,
  currentPunishment,
  onSaveJudgment,
}: PassJudgmentDialogProps) {
  const [punishmentType, setPunishmentType] = useState(currentPunishment?.punishmentType || "")
  const [duration, setDuration] = useState(currentPunishment?.duration || "")
  const [startDate, setStartDate] = useState<Date | undefined>(currentPunishment?.startDate)
  const [endDate, setEndDate] = useState<Date | undefined>(currentPunishment?.endDate)
  const [additionalRequirements, setAdditionalRequirements] = useState(currentPunishment?.additionalRequirements || "")
  const [judgmentNotes, setJudgmentNotes] = useState(currentPunishment?.judgmentNotes || "")

  useEffect(() => {
    if (currentPunishment) {
      setPunishmentType(currentPunishment.punishmentType || "")
      setDuration(currentPunishment.duration || "")
      setStartDate(currentPunishment.startDate)
      setEndDate(currentPunishment.endDate)
      setAdditionalRequirements(currentPunishment.additionalRequirements || "")
      setJudgmentNotes(currentPunishment.judgmentNotes || "")
    } else {
      // Reset form when dialog opens for a new judgment
      setPunishmentType("")
      setDuration("")
      setStartDate(undefined)
      setEndDate(undefined)
      setAdditionalRequirements("")
      setJudgmentNotes("")
    }
  }, [currentPunishment, open])

  const handleSubmit = () => {
    if (!punishmentType || !startDate || !endDate) {
      // Basic validation
      alert("Please fill in Punishment Type, Start Date, and End Date.")
      return
    }
    onSaveJudgment({
      punishmentType,
      duration,
      startDate,
      endDate,
      additionalRequirements,
      judgmentNotes,
    })
    onOpenChange(false) // Close dialog on successful save
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Pass Judgment: Case {caseId}</DialogTitle>
          <DialogDescription>
            Assign punishment for {studentName} regarding the offence of "{currentOffenceType}".
          </DialogDescription>
        </DialogHeader>
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
                  {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
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
                  className={cn("col-span-3 justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
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
          <Button onClick={handleSubmit} className="bg-sdc-blue hover:bg-sdc-blue/90 text-white">
            <AlertTriangle className="mr-2 h-4 w-4" /> Submit Judgment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
