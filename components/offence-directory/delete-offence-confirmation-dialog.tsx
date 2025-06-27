"use client";

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
import { Offence } from "./offence-list";
interface DeleteOffenceConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    offence: Offence | null;
    onConfirmDelete: () => void;
}

export function DeleteOffenceConfirmationDialog({
    isOpen,
    onClose,
    offence,
    onConfirmDelete,
}: DeleteOffenceConfirmationDialogProps) {
    if (!offence) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Offence</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete the offence:{" "}
                        <strong>{offence.offence}</strong>? This action cannot be
                        undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            onConfirmDelete();
                            onClose();
                        }}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
