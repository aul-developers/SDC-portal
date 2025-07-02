"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit2, Trash2 } from "lucide-react";
import { cn, deleteRequest, patchRequest } from "@/lib/utils";
import { EditOffenceDialog } from "./edit-offence-dialog"; // Import the dialog
import { DeleteOffenceConfirmationDialog } from "./delete-offence-confirmation-dialog"; // Import the dialog
import { useFetch } from "@/hooks/useFetch";
import { toast } from "sonner";

export interface Offence {
    id: number;
    offence: string;
    severity: "Low" | "Medium" | "High";
    punishment: string;
}

const severityColors = {
    Low: "bg-blue-50 text-blue-700 border-blue-100",
    Medium: "bg-amber-50 text-amber-700 border-amber-100",
    High: "bg-red-50 text-red-700 border-red-100",
};

interface OffenceListProps {
    searchQuery: string;
    severityFilter: string;
    // sortBy and sortDirection are not used in this simplified version but kept for potential future use
    // sortBy: string
    // sortDirection: "asc" | "desc"
    // onSelectOffence: (offenceId: string) => void // Not used if details are handled by dialogs
}

export function OffenceList({ searchQuery, severityFilter }: OffenceListProps) {
    const {
        data: currentOffences,
        isLoading,
        isError,
    } = useFetch<Offence[]>("/offences/");
    const [sortColumn, setSortColumn] = useState<keyof Offence | null>(
        "offence"
    );
    const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

    const [showEditDialog, setShowEditDialog] = useState(false);
    const [editingOffence, setEditingOffence] = useState<Offence | null>(null);

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deletingOffence, setDeletingOffence] = useState<Offence | null>(
        null
    );

    const handleEditClick = (offence: Offence) => {
        setEditingOffence(offence);
        setShowEditDialog(true);
    };

    const handleSaveEdit = async (updatedOffence: Offence) => {
        ///added patch request

        try {
            const response = await patchRequest(
                `/offences/${updatedOffence.id}/`,
                updatedOffence
            );

            if (response) {
                toast.success(response.message);
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Unexpected error";

            toast.error(errorMessage);
        }

        setShowEditDialog(false);
        setEditingOffence(null);
    };

    const handleDeleteClick = (offence: Offence) => {
        setDeletingOffence(offence);
        setShowDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        if (deletingOffence) {
            const response = await deleteRequest(
                `/offences/${deletingOffence.id}/`,
                deletingOffence
            );
        }
        setShowDeleteDialog(false);
        setDeletingOffence(null);
    };

    const filteredOffences =
        currentOffences === null
            ? []
            : Array.isArray(currentOffences)
            ? currentOffences.filter((offence) => {
                  const matchesSearch =
                      searchQuery === "" ||
                      offence.offence
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                      offence.punishment
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase());
                  const matchesSeverity =
                      severityFilter === "all" ||
                      offence.severity === severityFilter;
                  return matchesSearch && matchesSeverity;
              })
            : [];

    const sortedOffences = [...filteredOffences].sort((a, b) => {
        if (!sortColumn) return 0;
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (typeof aValue === "string" && typeof bValue === "string") {
            return sortDir === "asc"
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }
        return 0;
    });

    const handleSort = (column: keyof Offence) => {
        if (sortColumn === column) {
            setSortDir(sortDir === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDir("asc");
        }
    };

    return (
        <>
            <Card className="border shadow-sm overflow-hidden">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50 hover:bg-gray-50">
                                <TableHead
                                    className="cursor-pointer hover:bg-gray-100 w-[300px]"
                                    onClick={() => handleSort("offence")}
                                >
                                    Offence
                                    {sortColumn === "offence" && (
                                        <span className="ml-1">
                                            {sortDir === "asc" ? "↑" : "↓"}
                                        </span>
                                    )}
                                </TableHead>
                                <TableHead
                                    className="cursor-pointer hover:bg-gray-100 w-[150px]"
                                    onClick={() => handleSort("severity")}
                                >
                                    Severity
                                    {sortColumn === "severity" && (
                                        <span className="ml-1">
                                            {sortDir === "asc" ? "↑" : "↓"}
                                        </span>
                                    )}
                                </TableHead>
                                <TableHead>Standard Punishment</TableHead>
                                <TableHead className="text-right w-[100px]">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="h-24 text-center"
                                    >
                                        Loading Offence.....
                                    </TableCell>
                                </TableRow>
                            ) : sortedOffences.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="h-24 text-center"
                                    >
                                        No Offence found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                sortedOffences.map((offence) => (
                                    <TableRow
                                        key={offence.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <TableCell className="font-medium">
                                            {offence.offence}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={cn(
                                                    "capitalize",
                                                    severityColors[
                                                        offence.severity
                                                    ]
                                                )}
                                            >
                                                {offence.severity}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {offence.punishment}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end space-x-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() =>
                                                        handleEditClick(offence)
                                                    }
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                    <span className="sr-only">
                                                        Edit
                                                    </span>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() =>
                                                        handleDeleteClick(
                                                            offence
                                                        )
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">
                                                        Delete
                                                    </span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {editingOffence && (
                <EditOffenceDialog
                    isOpen={showEditDialog}
                    onClose={() => {
                        setShowEditDialog(false);
                        setEditingOffence(null);
                    }}
                    offence={editingOffence}
                    onSave={handleSaveEdit}
                />
            )}

            {deletingOffence && (
                <DeleteOffenceConfirmationDialog
                    isOpen={showDeleteDialog}
                    onClose={() => {
                        setShowDeleteDialog(false);
                        setDeletingOffence(null);
                    }}
                    offence={deletingOffence}
                    onConfirmDelete={handleConfirmDelete}
                />
            )}
        </>
    );
}
