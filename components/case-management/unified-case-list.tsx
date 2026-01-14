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
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Case } from "@/app/_types";
import { useAuth } from "@/app/context/auth-context";
import { createClient } from "@/utils/supabase/client";

interface UnifiedCaseListProps {
  onViewDetails: (caseId: number, type: "Individual" | "Grouped") => void;
  onEdit: (caseItem: Case) => void;
}

export function UnifiedCaseList({
  onViewDetails,
  onEdit,
}: UnifiedCaseListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cases, setCases] = useState<Case[]>([]);
  const { user } = useAuth();
  const supabase = createClient();

  useEffect(() => {
    const fetchCases = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("cases")
        .select(
          `
          *,
          student:student_id (
            full_name,
            matric_number
          )
        `
        )
        .order("created_at", { ascending: false });

      if (error) {
      } else if (data) {
        const formattedData = data.map((c: any) => ({
          ...c,
          students: c.student ? [c.student] : [], // Map single student to array
          case_type: c.case_type || "Individual",
        })) as Case[];
        setCases(formattedData);
      }
      setIsLoading(false);
    };

    fetchCases();
  }, []);

  const handleDelete = async (caseId: number, type: string) => {
    if (confirm("Are you sure you want to delete this case?")) {
      const { error } = await supabase.from("cases").delete().eq("id", caseId);
      if (!error) {
        setCases((prev) => prev.filter((c) => c.id !== caseId));
      } else {
        alert("Failed to delete case");
      }
    }
  };

  const handleEdit = (caseItem: Case) => {
    onEdit(caseItem);
  };

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      searchTerm === "" ||
      c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id?.toString().includes(searchTerm) ||
      (c.students &&
        c.students.some((s) =>
          s.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
        ));

    const matchesType = typeFilter
      ? c.case_type?.toLowerCase() === typeFilter.toLowerCase()
      : true;

    return matchesSearch && matchesType;
  });

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
            <Button variant="outline" className="h-11 px-4 gap-2 min-w-[140px]">
              <Filter className="h-4 w-4" />
              {typeFilter ? `Type: ${typeFilter}` : "All Types"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => setTypeFilter(null)}>
              All Types
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTypeFilter("individual")}>
              Individual
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTypeFilter("grouped")}>
              Grouped
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100/50 hover:bg-transparent">
              <TableHead className="w-[100px] text-xs font-bold text-gray-400 uppercase tracking-widest pl-4">
                Case ID
              </TableHead>
              <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Type
              </TableHead>
              <TableHead className="w-[200px] text-xs font-bold text-gray-400 uppercase tracking-widest">
                Title
              </TableHead>
              <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Students
              </TableHead>
              <TableHead className="hidden md:table-cell text-xs font-bold text-gray-400 uppercase tracking-widest">
                Offence
              </TableHead>
              <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Priority
              </TableHead>
              <TableHead className="hidden md:table-cell text-xs font-bold text-gray-400 uppercase tracking-widest">
                Date
              </TableHead>
              <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-widest text-right pr-4">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-32 text-center text-muted-foreground"
                >
                  Loading Cases....
                </TableCell>
              </TableRow>
            ) : filteredCases.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-32 text-center text-muted-foreground"
                >
                  No cases found.
                </TableCell>
              </TableRow>
            ) : (
              filteredCases.map((caseItem) => (
                <TableRow
                  key={caseItem.id}
                  className="border-none cursor-pointer rounded-2xl mb-2 bg-transparent"
                >
                  <TableCell className="pl-4 py-4 rounded-l-2xl font-medium text-sdc-navy text-sm">
                    #{caseItem.id}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`border-0 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider gap-1 ${
                        caseItem.offence_type === "individual"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-purple-50 text-purple-600"
                      }`}
                    >
                      {caseItem.offence_type === "individual" ? (
                        <User className="h-3 w-3" />
                      ) : (
                        <Users className="h-3 w-3" />
                      )}
                      {caseItem.offence_type}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    <p className="font-bold text-sdc-navy text-sm truncate">
                      {caseItem.title}
                    </p>
                    {caseItem.offence_type === "grouped" &&
                      "description" in caseItem && (
                        <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                          {caseItem.description}
                        </p>
                      )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {caseItem.students &&
                        caseItem.students.slice(0, 2).map((student, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Avatar className="h-6 w-6 border border-gray-200">
                              <AvatarFallback className="text-[9px] bg-sdc-blue/10 text-sdc-blue font-bold">
                                {student.full_name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium text-sdc-navy truncate max-w-[120px]">
                              {student.full_name}
                            </span>
                          </div>
                        ))}
                      {caseItem.students && caseItem.students.length > 2 && (
                        <span className="text-xs text-gray-500 pl-8">
                          +{caseItem.students.length - 2} more
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm font-medium text-gray-600">
                    {caseItem.title}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border-0",
                        caseItem.priority === "High" &&
                          "bg-red-50 text-red-600",
                        caseItem.priority === "medium" &&
                          "bg-orange-50 text-orange-600",
                        caseItem.priority === "Low" &&
                          "bg-green-50 text-green-600"
                      )}
                    >
                      {caseItem.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-gray-500">
                    {new Date(caseItem.incident_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="pr-4 rounded-r-2xl text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-sdc-navy"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem asChild>
                          <button
                            className="flex w-full items-center cursor-pointer"
                            onClick={() =>
                              onViewDetails(
                                caseItem.id as number,
                                caseItem.case_type as "Individual" | "Grouped"
                              )
                            }
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </button>
                        </DropdownMenuItem>

                        {/* Edit/Delete only for Admins and Board Members */}
                        {user?.role !== "viewer" && (
                          <>
                            <DropdownMenuItem asChild>
                              <button
                                className="flex w-full items-center cursor-pointer"
                                onClick={() => handleEdit(caseItem)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Case
                              </button>
                            </DropdownMenuItem>

                            {/* Delete only for Super Admin */}
                            {user?.role === "super_admin" && (
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
                            )}
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
    </div>
  );
}
