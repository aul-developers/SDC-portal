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
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { createClient } from "@/utils/supabase/client"; // Removed in favor of Redux
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  fetchStudents,
  setPage,
} from "@/lib/redux/features/students/studentSlice";
import {
  Search,
  Filter,
  UserCircle,
  History,
  GraduationCap,
  AlertTriangle,
  CheckCircle,
  Clock,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";
import { Student } from "@/app/_types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface EnhancedStudentListProps {
  onViewProfile: (matricNumber: string) => void;
  onViewCaseHistory: (matricNumber: string) => void;
}

export function EnhancedStudentList({
  onViewProfile,
  onViewCaseHistory,
}: EnhancedStudentListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const dispatch = useAppDispatch();
  const {
    items: students,
    status,
    page,
    totalPages,
  } = useAppSelector((state) => state.students);

  // Use local state for filtered results since filter is client-side for now
  // OR rely on the `students` from store if pagination is server-side and search is local.
  // Ideally search should be server-side too, but for now let's keep the filter logic client-side on the current page's data
  // or refactor search to be server-side. Given the prompt, let's stick to what we have but use store data.

  // Actually, wait, the `searchTerm` logic in the component filters the *fetched* data.
  // If we paginate on server, client-side filtering only filters the current page.
  // For now, I will use `students` from store as source.

  useEffect(() => {
    dispatch(fetchStudents(page));
  }, [page, dispatch]);
  // Get unique departments for filter
  const departments = Array.from(
    new Set(students.map((student) => student.department)),
  );

  // Filter students based on search term and filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      searchTerm === "" ||
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.matricNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.department &&
        student.department.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDepartment =
      departmentFilter === null || student.department === departmentFilter;
    const matchesStatus =
      statusFilter === null || student.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Status icon mapping
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "closed":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced search and filter bar */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, matric number, or department..."
                className="pl-9 h-10 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 gap-1 bg-white">
                    <GraduationCap className="h-4 w-4" />
                    <span className="max-w-[150px] truncate">
                      {departmentFilter ? `${departmentFilter}` : "Department"}
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="max-h-[300px] overflow-y-auto"
                >
                  <DropdownMenuItem onClick={() => setDepartmentFilter(null)}>
                    All Departments
                  </DropdownMenuItem>
                  {departments.map((department) => (
                    <DropdownMenuItem
                      key={department}
                      onClick={() =>
                        department && setDepartmentFilter(department)
                      }
                    >
                      {department}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 gap-1 bg-white">
                    <Filter className="h-4 w-4" />
                    <span>
                      {statusFilter
                        ? `${
                            statusFilter.charAt(0).toUpperCase() +
                            statusFilter.slice(1)
                          }`
                        : "Status"}
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                    All Statuses
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("closed")}>
                    Closed
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex items-center gap-1 ml-auto">
                <Button
                  variant={viewMode === "table" ? "default" : "outline"}
                  size="icon"
                  className="h-10 w-10 bg-white text-sdc-navy"
                  onClick={() => setViewMode("table")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M3 15h18" />
                    <path d="M9 3v18" />
                    <path d="M15 3v18" />
                  </svg>
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  className="h-10 w-10 bg-white text-sdc-navy"
                  onClick={() => setViewMode("grid")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="7" height="7" x="3" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="14" rx="1" />
                    <rect width="7" height="7" x="3" y="14" rx="1" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {viewMode === "table" ? (
        <div className="w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-100/50 hover:bg-transparent">
                <TableHead className="w-[300px] text-xs font-bold text-gray-400 uppercase tracking-widest pl-4">
                  Student
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Matric Number
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Department
                </TableHead>
                <TableHead className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Cases
                </TableHead>
                <TableHead className="text-right text-xs font-bold text-gray-400 uppercase tracking-widest pr-4">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-gray-500"
                  >
                    No students found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow
                    key={student.matricNumber}
                    className="border-none hover:bg-gray-50 cursor-pointer rounded-2xl mb-2"
                  >
                    <TableCell className="pl-4 py-4 rounded-l-2xl">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                          <AvatarImage
                            src={student.image || "/placeholder.svg"}
                            alt={student.name}
                          />
                          <AvatarFallback className="text-[10px] bg-sdc-blue/10 text-sdc-blue font-bold">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold text-sdc-navy text-sm">
                            {student.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {student.level}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-sm text-gray-600">
                      {student.matricNumber}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {student.department}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={cn(
                          "rounded-full px-2.5 py-0.5 font-bold border-0",
                          student.caseCount > 0
                            ? "bg-amber-50 text-amber-600"
                            : "bg-green-50 text-green-600",
                        )}
                      >
                        {student.caseCount}
                      </Badge>
                    </TableCell>
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
                                onViewProfile(student.matricNumber)
                              }
                            >
                              <UserCircle className="mr-2 h-4 w-4" />
                              View Profile
                            </button>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <button
                              className="flex w-full items-center cursor-pointer"
                              onClick={() =>
                                onViewCaseHistory(student.matricNumber)
                              }
                            >
                              <History className="mr-2 h-4 w-4" />
                              View Case History
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
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredStudents.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No students found.
            </div>
          ) : (
            filteredStudents.map((student) => (
              <Card
                key={student.matricNumber}
                className="overflow-hidden border-none shadow-sm"
              >
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                          <AvatarImage
                            src={student.image || "/placeholder.svg"}
                            alt={student.name}
                          />
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sdc-navy">
                            {student.name}
                          </div>
                          <div className="text-xs text-sdc-gray">
                            {student.matricNumber}
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => onViewProfile(student.matricNumber)}
                          >
                            <UserCircle className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              onViewCaseHistory(student.matricNumber)
                            }
                          >
                            <History className="mr-2 h-4 w-4" />
                            View Case History
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Department
                        </p>
                        <p className="font-medium text-sdc-navy truncate">
                          {student.department}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Level</p>
                        <p className="font-medium text-sdc-navy">
                          {student.level}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Cases</p>
                        <p className="font-medium text-sdc-navy">
                          {student.caseCount}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-muted-foreground mt-6">
        <div>
          Showing page {page} of {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => dispatch(setPage(page - 1))}
          >
            Previous
          </Button>

          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            return (
              <Button
                key={pageNum}
                variant={page === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => dispatch(setPage(pageNum))}
              >
                {pageNum}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => dispatch(setPage(page + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
