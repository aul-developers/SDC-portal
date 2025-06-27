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
import LoadingButton from "../LoadingButton";
import { postRequest } from "@/lib/utils";
import { toast } from "sonner";

interface AddOffenceDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export interface offenceFormProps {
    offenceName: string;
    offenceSeverity: "Low" | "Medium" | "High" | string;
    offencePunishment: string;
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
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // console.log(offenceForm);
    const handleUpdateOffenceFormField = useCallback(
        (offenceValues: Partial<offenceFormProps>) => {
            setOffenceForm((prevData) => {
                return { ...prevData, ...offenceValues };
            });
        },
        []
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // API call

        const SubmittedOffenceForm = {
            offence: offenceForm.offenceName,
            severity: offenceForm.offenceSeverity,
            punishment: offenceForm.offencePunishment,
        };
        console.log(SubmittedOffenceForm);

        try {
            const response = await postRequest<submitOffenceProps>(
                "/offences/",
                SubmittedOffenceForm
            );

            if (response) {
                toast.success(response.message);
                console.log(response);
            }
            console.log(response);

            setIsSubmitting(false);
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Unexpected error";

            toast.error(errorMessage);
            console.log(error);
            setIsSubmitting(false);
        }

        // Reset form and close dialog

        setOffenceForm({
            offenceName: "",
            offencePunishment: "",
            offenceSeverity: "",
        });

        setIsSubmitting(false);
        onOpenChange(false);
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
