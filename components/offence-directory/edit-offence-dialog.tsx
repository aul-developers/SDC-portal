"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface Offence {
  id: string
  name: string
  severity: "low" | "medium" | "high"
  standardPunishment: string
}

interface EditOffenceDialogProps {
  isOpen: boolean
  onClose: () => void
  offence: Offence | null
  onSave: (updatedOffence: Offence) => void
}

export function EditOffenceDialog({ isOpen, onClose, offence, onSave }: EditOffenceDialogProps) {
  const [name, setName] = useState("")
  const [severity, setSeverity] = useState<"low" | "medium" | "high">("low")
  const [standardPunishment, setStandardPunishment] = useState("")

  useEffect(() => {
    if (offence) {
      setName(offence.name)
      setSeverity(offence.severity)
      setStandardPunishment(offence.standardPunishment)
    }
  }, [offence])

  const handleSubmit = () => {
    if (!offence) return
    onSave({
      ...offence,
      name,
      severity,
      standardPunishment,
    })
    onClose()
  }

  if (!offence) return null

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
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="severity" className="text-right">
              Severity
            </Label>
            <Select value={severity} onValueChange={(value: "low" | "medium" | "high") => setSeverity(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="punishment" className="text-right">
              Standard Punishment
            </Label>
            <Textarea
              id="punishment"
              value={standardPunishment}
              onChange={(e) => setStandardPunishment(e.target.value)}
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
  )
}
