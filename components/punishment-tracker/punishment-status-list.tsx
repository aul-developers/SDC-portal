"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { useState } from "react";

import { Punishment } from "@/app/_types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MOCK_PUNISHMENTS } from "@/app/dashboard/_data/mock-data";

interface PunishmentStatusListProps {
  status: "Active" | "Pending" | "Completed";
  searchTerm: string;
  onViewDetails: (punishmentId: string) => void;
}

export function PunishmentStatusList({
  status,
  searchTerm,
  onViewDetails,
}: PunishmentStatusListProps) {
  const [page, setPage] = useState(1);
  const isLoading = false; // Mock loading state

  // Filter punishments from mock data
  const filteredPunishments = MOCK_PUNISHMENTS.filter((punishment) => {
    // Check status match (case-insensitive)
    const statusMatch =
      punishment.status.toLowerCase() === status.toLowerCase();

    if (!statusMatch) return false;

    if (searchTerm === "") return true;
    const lowerSearch = searchTerm.toLowerCase();

    return (
      punishment.id.toString().toLowerCase().includes(lowerSearch) ||
      punishment.punishment_type?.toLowerCase().includes(lowerSearch) ||
      punishment.student?.matric_number?.toLowerCase().includes(lowerSearch) ||
      punishment.student?.full_name?.toLowerCase().includes(lowerSearch)
    );
  });

  const handleMarkActive = async (punishmentId: string) => {
    toast.success("Punishment marked as Active (Mock)");
  };

  const handleMarkComplete = async (punishmentId: string) => {
    toast.success("Punishment marked as Completed (Mock)");
  };

  const getStatusTitle = () => {
    switch (status) {
      case "Active":
        return "Active Punishments";
      case "Pending":
        return "Pending Punishments";
      case "Completed":
        return "Completed Punishments";
    }
  };

  const getEmptyStateMessage = () => {
    switch (status) {
      case "Active":
        return "No active punishments found.";
      case "Pending":
        return "No pending punishments found.";
      case "Completed":
        return "No completed punishments found.";
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-sdc-navy">{getStatusTitle()}</h3>

      <div className="w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100/50 hover:bg-transparent">
              <TableHead className="w-[250px] text-xs font-bold text-gray-400 uppercase tracking-widest pl-4">
                Student
              </TableHead>
              <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Matric No
              </TableHead>
              <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Full Name
              </TableHead>
              <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Department
              </TableHead>
              <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Punishment Type
              </TableHead>
              <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Severity Level
              </TableHead>
              {status === "Completed" && (
                <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Completion Date
                </TableHead>
              )}
              <TableHead className="text-right pr-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={status === "Completed" ? 8 : 7}
                  className="h-24 text-center text-gray-500"
                >
                  Loading Punishments...
                </TableCell>
              </TableRow>
            ) : filteredPunishments?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={status === "Completed" ? 8 : 7}
                  className="h-24 text-center text-gray-500"
                >
                  {getEmptyStateMessage()}
                </TableCell>
              </TableRow>
            ) : (
              filteredPunishments?.map((punishment) => (
                <TableRow
                  key={punishment.id}
                  className="border-none hover:bg-white hover:shadow-sm transition-all group cursor-pointer rounded-2xl mb-2"
                >
                  <TableCell className="pl-4 py-4 rounded-l-2xl">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border-2 border-white">
                        <AvatarImage
                          src={"/placeholder.svg"}
                          alt={punishment.student?.matric_number || "Student"}
                        />
                        <AvatarFallback>
                          {punishment.student?.full_name?.[0] || "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <p className="font-medium text-gray-900">
                          {punishment.student?.full_name || "Unknown Student"}
                        </p>
                        <div className="text-xs text-gray-400">
                          {punishment.student?.matric_number}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-sm text-gray-600">
                    {punishment.student?.matric_number}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {punishment.student?.full_name}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {punishment.student?.department}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                      {punishment.punishment_type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                      Medium
                    </span>
                  </TableCell>
                  {status === "Completed" && (
                    <TableCell className="text-sm text-gray-500">
                      {punishment.end_date &&
                        new Date(punishment.end_date).toLocaleDateString()}
                    </TableCell>
                  )}
                  <TableCell className="text-right pr-4 rounded-r-2xl">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-sdc-navy"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <button
                            className="flex w-full items-center cursor-pointer"
                            onClick={() =>
                              onViewDetails(punishment.id.toString())
                            }
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </button>
                        </DropdownMenuItem>
                        {status !== "Completed" && (
                          <>
                            <DropdownMenuItem asChild>
                              <button
                                className="flex w-full items-center cursor-pointer"
                                onClick={() => {
                                  status === "Pending"
                                    ? handleMarkActive(punishment.id.toString())
                                    : handleMarkComplete(
                                        punishment.id.toString()
                                      );
                                }}
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                {status === "Pending"
                                  ? "Mark as Active"
                                  : "Mark as Completed"}
                              </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <button
                                className="flex w-full items-center cursor-pointer"
                                onClick={() =>
                                  onViewDetails(punishment.id.toString())
                                }
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Update Progress
                              </button>
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          Showing {filteredPunishments?.length ?? 0} {status} punishments
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev: number) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">Page {page}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev: number) => prev + 1)}
            disabled={true} // Mock pagination limit
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
