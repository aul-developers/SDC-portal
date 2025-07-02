"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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
import { postRequest } from "@/lib/utils";
import { useFetch } from "@/hooks/useFetch";
import { toast } from "sonner";
import { useState } from "react";

// Interfaces
interface PunishmentStatusListProps {
    status: "active" | "pending" | "completed";
    searchTerm: string;
    onViewDetails: (punishmentId: string) => void;
}

interface PunishmentDataProps {
    id: number;
    full_name: string;
    matric_no: string;
    department: string;
    punishment_type: string;
    severity_level: string;
    punishment_title: string;
    description: string;
    start_time: string;
    end_time: string;
    duration: string;
    add_conditions: string;
    status: string;
    is_completed: string;
    created_by: number;
}

interface PaginatedPunishmentList {
    count: number;
    next: string | null;
    previous: string | null;
    results: PunishmentDataProps[];
}

export function PunishmentStatusList({
    status,
    searchTerm,
    onViewDetails,
}: PunishmentStatusListProps) {
    const [page, setPage] = useState(1);

    // Pass status to backend so pagination respects filtering
    const { data, isLoading, isError } =
        useFetch<PaginatedPunishmentList>(
            `/get/punishments/?page=${page}&status=${status}`
        );

    // Filter only by searchTerm on frontend (backend filters status)
    const filteredPunishments = data?.results?.filter((punishment) => {
        if (searchTerm === "") return true;
        const lowerSearch = searchTerm.toLowerCase();

        return (
            punishment.id.toString().toLowerCase().includes(lowerSearch) ||
            punishment.punishment_title.toLowerCase().includes(lowerSearch) ||
            punishment.matric_no.toLowerCase().includes(lowerSearch) ||
            punishment.punishment_type.toLowerCase().includes(lowerSearch)
        );
    });

    const handleMarkActive = async (punishmentId: string) => {
        try {
            const response = await postRequest("update/punishment/", {
                punishment_id: punishmentId,
                status: "Active",
            });

            if (response) {
                toast.success(response.message);
            }
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                "Failed to mark punishment as active";
            toast.error(errorMessage);
        }
    };

    const handleMarkComplete = async (punishmentId: string) => {
        try {
            const response = await postRequest("update/punishment/", {
                punishment_id: punishmentId,
                status: "Completed",
            });

            if (response) {
                toast.success(response.message);
            }
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                "Failed to mark punishment as completed";
            toast.error(errorMessage);
        }
    };

    const getStatusTitle = () => {
        switch (status) {
            case "active":
                return "Active Punishments";
            case "pending":
                return "Pending Punishments";
            case "completed":
                return "Completed Punishments";
        }
    };

    const getEmptyStateMessage = () => {
        switch (status) {
            case "active":
                return "No active punishments found.";
            case "pending":
                return "No pending punishments found.";
            case "completed":
                return "No completed punishments found.";
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium text-sdc-navy">
                {getStatusTitle()}
            </h3>

            <Card className="border-none shadow-sm overflow-hidden">
                <div className="rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30 hover:bg-muted/30">
                                <TableHead>Student</TableHead>
                                <TableHead>Matric No</TableHead>
                                <TableHead>Full Name</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Punishment Type</TableHead>
                                <TableHead>Severity Level</TableHead>
                                {status === "completed" && (
                                    <TableHead>Completion Date</TableHead>
                                )}
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="h-24 text-center"
                                    >
                                        Loading Cases...
                                    </TableCell>
                                </TableRow>
                            ) : filteredPunishments?.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="h-24 text-center"
                                    >
                                        {getEmptyStateMessage()}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredPunishments?.map((punishment) => (
                                    <TableRow
                                        key={punishment.id}
                                        className="group hover:bg-muted/20"
                                    >
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9 border border-border">
                                                    <AvatarImage
                                                        src={"/placeholder.svg"}
                                                        alt={
                                                            punishment.matric_no
                                                        }
                                                    />
                                                    <AvatarFallback className="text-xs">
                                                        {punishment.full_name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="text-xs text-sdc-gray">
                                                        {punishment.matric_no}
                                                    </div>
                                                    <div className="text-xs text-sdc-gray">
                                                        {punishment?.full_name}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {punishment?.matric_no}
                                        </TableCell>
                                        <TableCell>
                                            {punishment?.full_name}
                                        </TableCell>
                                        <TableCell>
                                            {punishment?.department}
                                        </TableCell>
                                        <TableCell>
                                            {punishment?.punishment_type}
                                        </TableCell>
                                        <TableCell>
                                            {punishment?.severity_level}
                                        </TableCell>
                                        {status === "completed" && (
                                            <TableCell>
                                                {new Date(
                                                    punishment.end_time
                                                ).toLocaleDateString()}
                                            </TableCell>
                                        )}
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <span className="sr-only">
                                                            Open menu
                                                        </span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <button
                                                            className="flex w-full items-center cursor-pointer"
                                                            onClick={() =>
                                                                onViewDetails(
                                                                    punishment.id.toString()
                                                                )
                                                            }
                                                        >
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Details
                                                        </button>
                                                    </DropdownMenuItem>
                                                    {status !== "completed" && (
                                                        <>
                                                            <DropdownMenuItem asChild>
                                                                <button
                                                                    className="flex w-full items-center cursor-pointer"
                                                                    onClick={() => {
                                                                        status ===
                                                                        "pending"
                                                                            ? handleMarkActive(
                                                                                  punishment.id.toString()
                                                                              )
                                                                            : handleMarkComplete(
                                                                                  punishment.id.toString()
                                                                              );
                                                                    }}
                                                                >
                                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                                    {status ===
                                                                    "pending"
                                                                        ? "Mark as Active"
                                                                        : "Mark as Completed"}
                                                                </button>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem asChild>
                                                                <button
                                                                    className="flex w-full items-center cursor-pointer"
                                                                    onClick={() =>
                                                                        onViewDetails(
                                                                            punishment.id.toString()
                                                                        )
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
            </Card>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div>
                    Showing {filteredPunishments?.length ?? 0} {status} punishments
                </div>
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={!data?.previous}
                    >
                        Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        Page {page}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((prev) => prev + 1)}
                        disabled={!data?.next}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
