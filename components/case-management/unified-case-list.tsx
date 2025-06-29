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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
    Search,
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
    Filter,
    Users,
    User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useFetch } from "@/hooks/useFetch";
import { caseFormSchema, involvedStudentSchema } from "./create-case-form";

interface UnifiedCaseListProps {
    onViewDetails: (caseId: number, type: "Individual" | "Grouped") => void;
}

export function UnifiedCaseList({ onViewDetails }: UnifiedCaseListProps) {
    const {
        data: UnifiedCases,
        isLoading,
        isError,
    } = useFetch<caseFormSchema[]>("/get/case/");
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState<string | null>(null);
    console.log(UnifiedCases);

    // Filter cases based on search term, status filter, and type filter
    const filteredCases: caseFormSchema[] =
        UnifiedCases === null
            ? []
            : Array.isArray(UnifiedCases)
            ? UnifiedCases.filter((caseItem: caseFormSchema) => {
                  const matchesSearch =
                      searchTerm === "" ||
                      caseItem.title
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                      caseItem.offence_type
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                      (caseItem.students as involvedStudentSchema[]).some(
                          (student) =>
                              student.full_name
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase()) ||
                              student.matric_number
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase())
                      );
                  const matchesType =
                      typeFilter === null ||
                      caseItem.offence_type === typeFilter;

                  return matchesSearch && matchesType;
              })
            : [];

    const handleDelete = (caseId: number, type: string) => {
        alert(`Delete ${type} case ${caseId}`);
    };

    const handleEdit = (caseId: number, type: string) => {
        alert(`Edit ${type} case ${caseId}`);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search by case ID, title, student name, or offence..."
                        className="pl-10 h-11"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="h-11 px-4 gap-2 min-w-[140px]"
                        >
                            <Filter className="h-4 w-4" />
                            {typeFilter ? `Type: ${typeFilter}` : "All Types"}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => setTypeFilter(null)}>
                            All Types
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => setTypeFilter("individual")}
                        >
                            Individual
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => setTypeFilter("grouped")}
                        >
                            Grouped
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="rounded-lg border bg-white shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b">
                            <TableHead className="h-12 px-6 font-medium">
                                Case ID
                            </TableHead>
                            <TableHead className="h-12 px-6 font-medium">
                                Type
                            </TableHead>
                            <TableHead className="h-12 px-6 font-medium">
                                Title
                            </TableHead>
                            <TableHead className="h-12 px-6 font-medium">
                                Students
                            </TableHead>
                            <TableHead className="h-12 px-6 font-medium">
                                Offence
                            </TableHead>

                            <TableHead className="h-12 px-6 font-medium">
                                Priority
                            </TableHead>
                            <TableHead className="h-12 px-6 font-medium">
                                Date
                            </TableHead>
                            <TableHead className="h-12 px-6 text-right font-medium">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={9}
                                    className="h-32 text-center text-muted-foreground"
                                >
                                    Loading Cases....
                                </TableCell>
                            </TableRow>
                        ) : filteredCases.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={9}
                                    className="h-32 text-center text-muted-foreground"
                                >
                                    No cases found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredCases.map((caseItem) => (
                                <TableRow
                                    key={caseItem.id}
                                    className="hover:bg-gray-50/50"
                                >
                                    <TableCell className="px-6 py-4 font-medium">
                                        {caseItem.id}
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <Badge
                                            variant="outline"
                                            className="gap-1"
                                        >
                                            {caseItem.offence_type ===
                                            "individual" ? (
                                                <User className="h-3 w-3" />
                                            ) : (
                                                <Users className="h-3 w-3" />
                                            )}
                                            {caseItem.offence_type
                                                .charAt(0)
                                                .toUpperCase() +
                                                caseItem.offence_type.slice(1)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 max-w-xs">
                                        <p className="font-medium text-sm truncate">
                                            {caseItem.title}
                                        </p>
                                        {caseItem.offence_type === "grouped" &&
                                            "description" in caseItem && (
                                                <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                                                    {caseItem.description}
                                                </p>
                                            )}
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex -space-x-2">
                                                {caseItem.students &&
                                                    caseItem.students
                                                        .slice(0, 3)
                                                        .map(
                                                            (
                                                                student,
                                                                index
                                                            ) => (
                                                                <Avatar
                                                                    key={index}
                                                                    className="h-8 w-8 border-2 border-background"
                                                                >
                                                                    <AvatarFallback className="text-xs">
                                                                        {(
                                                                            student as involvedStudentSchema
                                                                        ).full_name
                                                                            .split(
                                                                                " "
                                                                            )
                                                                            .map(
                                                                                (
                                                                                    n
                                                                                ) =>
                                                                                    n[0]
                                                                            )
                                                                            .join(
                                                                                ""
                                                                            )}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                            )
                                                        )}
                                            </div>
                                            <div>
                                                <span className="text-xs font-medium">
                                                    {caseItem.students &&
                                                        caseItem.students
                                                            .length}
                                                </span>
                                                {caseItem.students &&
                                                    caseItem.students.length >
                                                        3 && (
                                                        <span className="text-xs text-muted-foreground ml-1">
                                                            (+
                                                            {caseItem.students
                                                                .length - 3}
                                                            )
                                                        </span>
                                                    )}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        {caseItem.title}
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <Badge
                                            variant="outline"
                                            className={cn(
                                                "px-3 py-1",
                                                caseItem.priority === "High" &&
                                                    "border-red-200 text-red-700 bg-red-50",
                                                caseItem.priority ===
                                                    "medium" &&
                                                    "border-amber-200 text-amber-700 bg-amber-50",
                                                caseItem.priority === "Low" &&
                                                    "border-green-200 text-green-700 bg-green-50"
                                            )}
                                        >
                                            {caseItem.priority
                                                .charAt(0)
                                                .toUpperCase() +
                                                caseItem.priority.slice(1)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        {new Date(
                                            caseItem.incident_date
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <span className="sr-only">
                                                        Open menu
                                                    </span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="end"
                                                className="w-48"
                                            >
                                                <DropdownMenuItem asChild>
                                                    <button
                                                        className="flex w-full items-center cursor-pointer"
                                                        onClick={() =>
                                                            onViewDetails(
                                                                caseItem.id as number,
                                                                caseItem.case_type as
                                                                    | "Individual"
                                                                    | "Grouped"
                                                            )
                                                        }
                                                    >
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View Details
                                                    </button>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <button
                                                        className="flex w-full items-center cursor-pointer"
                                                        onClick={() =>
                                                            handleEdit(
                                                                caseItem.id as number,
                                                                caseItem.case_type as
                                                                    | "Individual"
                                                                    | "Grouped"
                                                            )
                                                        }
                                                    >
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit Case
                                                    </button>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    asChild
                                                    className="text-red-600 focus:text-red-600"
                                                >
                                                    <button
                                                        className="flex w-full items-center cursor-pointer"
                                                        onClick={() =>
                                                            handleDelete(
                                                                caseItem.id as number,
                                                                caseItem.case_type as
                                                                    | "Individual"
                                                                    | "Grouped"
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete Case
                                                    </button>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
