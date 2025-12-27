"use client";

import { useState, useEffect } from "react";
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
import { DataApiClient } from "@/service/apiClient";
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
  sortBy: string;
  sortDirection: "asc" | "desc";
  onSelectOffence: (offenceId: string) => void;
}

export function OffenceList({ searchQuery, severityFilter }: OffenceListProps) {
  const [currentOffences, setCurrentOffences] = useState<Offence[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchOffences = async () => {
      setIsLoading(true);
      try {
        const response = await DataApiClient.get<Offence[]>("/offences/");
        setCurrentOffences(response.data);
        setIsError(false);
      } catch (error) {
        console.error("Failed to fetch offences:", error);
        setIsError(true);
        toast.error("Failed to fetch offences");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffences();
  }, []);
  const [sortColumn, setSortColumn] = useState<keyof Offence | null>("offence");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingOffence, setEditingOffence] = useState<Offence | null>(null);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingOffence, setDeletingOffence] = useState<Offence | null>(null);

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
            offence.offence.toLowerCase().includes(searchQuery.toLowerCase()) ||
            offence.punishment
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          const matchesSeverity =
            severityFilter === "all" || offence.severity === severityFilter;
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
      <div className="w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100/50 hover:bg-transparent">
              <TableHead
                className="cursor-pointer hover:bg-transparent w-[300px] text-xs font-bold text-gray-400 uppercase tracking-widest pl-4"
                onClick={() => handleSort("offence")}
              >
                Offence
                {sortColumn === "offence" && (
                  <span className="ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-transparent w-[150px] text-xs font-bold text-gray-400 uppercase tracking-widest"
                onClick={() => handleSort("severity")}
              >
                Severity
                {sortColumn === "severity" && (
                  <span className="ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>
                )}
              </TableHead>
              <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Standard Punishment
              </TableHead>
              <TableHead className="text-right w-[100px] text-xs font-bold text-gray-400 uppercase tracking-widest pr-4">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-gray-500"
                >
                  Loading Offence.....
                </TableCell>
              </TableRow>
            ) : sortedOffences.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-gray-500"
                >
                  No Offence found.
                </TableCell>
              </TableRow>
            ) : (
              sortedOffences.map((offence) => (
                <TableRow
                  key={offence.id}
                  className="border-none hover:bg-gray-50 cursor-pointer rounded-2xl mb-2"
                >
                  <TableCell className="pl-4 py-4 rounded-l-2xl font-bold text-sdc-navy text-sm">
                    {offence.offence}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "border-0 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                        offence.severity === "High"
                          ? "bg-red-50 text-red-600"
                          : offence.severity === "Medium"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-blue-50 text-blue-600"
                      )}
                    >
                      {offence.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {offence.punishment}
                  </TableCell>
                  <TableCell className="text-right pr-4 rounded-r-2xl">
                    <div className="flex justify-end space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-sdc-navy"
                        onClick={() => handleEditClick(offence)}
                      >
                        <Edit2 className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-red-600"
                        onClick={() => handleDeleteClick(offence)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

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
