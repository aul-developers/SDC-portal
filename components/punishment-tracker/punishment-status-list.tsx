"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/utils/supabase/client";
import { Punishment } from "@/app/_types";

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
  const [punishments, setPunishments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchPunishments();
  }, [status]); // Refetch when status tab changes

  const fetchPunishments = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from("punishments")
        .select("*")
        .eq("status", status)
        .order("start_date", { ascending: false });

      if (error) throw error;
      setPunishments(data || []);
    } catch (error) {
      console.error("Error fetching punishments:", error);
      toast.error("Failed to load punishments");
    } finally {
      setIsLoading(false);
    }
  };

  const currentPunishments = punishments.filter((p) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      p.full_name?.toLowerCase().includes(search) ||
      p.matric_no?.toLowerCase().includes(search) ||
      p.punishment_title?.toLowerCase().includes(search) ||
      String(p.id).includes(search)
    );
  });

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

  const handleMarkComplete = async (punishmentId: number) => {
    const supabase = createClient();
    try {
      const { error } = await supabase
        .from("punishments")
        .update({ status: "Completed" })
        .eq("id", punishmentId);

      if (error) throw error;

      toast.success("Punishment marked as completed");
      fetchPunishments();
    } catch (e: any) {
      toast.error(e.message || "Failed to update status");
    }
  };

  const handleMarkActive = async (punishmentId: number) => {
    const supabase = createClient();
    try {
      const { error } = await supabase
        .from("punishments")
        .update({ status: "Active" })
        .eq("id", punishmentId);

      if (error) throw error;

      toast.success("Punishment activated");
      fetchPunishments();
    } catch (e: any) {
      toast.error(e.message || "Failed to update status");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-sdc-navy">{getStatusTitle()}</h3>

      <div className="w-full overflow-x-auto">
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
            ) : currentPunishments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={status === "Completed" ? 8 : 7}
                  className="h-24 text-center text-gray-500"
                >
                  {getEmptyStateMessage()}
                </TableCell>
              </TableRow>
            ) : (
              currentPunishments.map((punishment) => (
                <TableRow
                  key={punishment.id}
                  className="border-none hover:bg-white hover:shadow-sm transition-all group cursor-pointer rounded-2xl mb-2"
                >
                  <TableCell className="pl-4 py-4 rounded-l-2xl">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border-2 border-white">
                        <AvatarImage
                          src={"/placeholder.svg"}
                          alt={punishment.matric_no || "Student"}
                        />
                        <AvatarFallback>
                          {punishment.full_name
                            ?.substring(0, 2)
                            .toUpperCase() || "??"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <p className="font-medium text-gray-900">
                          {punishment.full_name || "Unknown Student"}
                        </p>
                        <div className="text-xs text-gray-400 block sm:hidden">
                          {punishment.matric_no}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-sm text-gray-600">
                    {punishment.matric_no}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {punishment.department}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                      {punishment.punishment_type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                      {punishment.severity_level || "Medium"}
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
                                    ? handleMarkActive(punishment.id)
                                    : handleMarkComplete(punishment.id);
                                }}
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                {status === "Pending"
                                  ? "Mark as Active"
                                  : "Mark as Completed"}
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
          Showing {currentPunishments.length} {status} punishments
        </div>
      </div>
    </div>
  );
}
