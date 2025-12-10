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
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for cases
const mockCases = [
  {
    id: "SDC-2024-091",
    student: "Robert Chen",
    matricNumber: "STU-45789",
    offence: "Academic Dishonesty",
    punishment: "Academic Probation",
    status: "pending",
    date: "2024-05-10",
  },
  {
    id: "SDC-2024-090",
    student: "James Wilson",
    matricNumber: "STU-43456",
    offence: "Behavioral Misconduct",
    punishment: "Community Service",
    status: "scheduled",
    date: "2024-05-09",
  },
  {
    id: "SDC-2024-089",
    student: "Michael Brown",
    matricNumber: "STU-45678",
    offence: "Academic Dishonesty",
    punishment: "Written Warning",
    status: "pending",
    date: "2024-05-08",
  },
  {
    id: "SDC-2024-088",
    student: "Jessica Lee",
    matricNumber: "STU-45123",
    offence: "Behavioral Misconduct",
    punishment: "Academic Probation",
    status: "in-progress",
    date: "2024-05-07",
  },
  {
    id: "SDC-2024-087",
    student: "David Wilson",
    matricNumber: "STU-42456",
    offence: "Property Damage",
    punishment: "Restitution",
    status: "in-progress",
    date: "2024-05-06",
  },
  {
    id: "SDC-2024-086",
    student: "Sarah Johnson",
    matricNumber: "STU-41234",
    offence: "Substance Violation",
    punishment: "Suspension",
    status: "resolved",
    date: "2024-05-05",
  },
  {
    id: "SDC-2024-085",
    student: "Emily Parker",
    matricNumber: "STU-45789",
    offence: "Academic Dishonesty",
    punishment: "Grade Reduction",
    status: "resolved",
    date: "2024-05-04",
  },
  {
    id: "SDC-2024-084",
    student: "Sophia Martinez",
    matricNumber: "STU-47890",
    offence: "Behavioral Misconduct",
    punishment: "Disciplinary Probation",
    status: "resolved",
    date: "2024-05-03",
  },
];

interface CaseListProps {
  onViewDetails: (caseId: string) => void;
}

export function CaseList({ onViewDetails }: CaseListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Filter cases based on search term and status filter
  const filteredCases = mockCases.filter((caseItem) => {
    const matchesSearch =
      searchTerm === "" ||
      caseItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.matricNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.offence.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === null || caseItem.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleDelete = (caseId: string) => {
    // In a real application, this would call an API to delete the case
    alert(`Delete case ${caseId}`);
  };

  const handleEdit = (caseId: string) => {
    // In a real application, this would open an edit form
    alert(`Edit case ${caseId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by case ID, student name, matric number, or offence..."
            className="pl-10 h-11"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-11 px-4 gap-2 min-w-[160px]">
              <Filter className="h-4 w-4" />
              {statusFilter ? `Status: ${statusFilter}` : "Filter by Status"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => setStatusFilter(null)}>
              All Statuses
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("scheduled")}>
              Scheduled
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("in-progress")}>
              In Progress
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("resolved")}>
              Resolved
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-lg border bg-white shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="h-12 px-6 font-medium">Case ID</TableHead>
              <TableHead className="h-12 px-6 font-medium">Student</TableHead>
              <TableHead className="h-12 px-6 font-medium">
                Matric Number
              </TableHead>
              <TableHead className="h-12 px-6 font-medium">Offence</TableHead>
              <TableHead className="h-12 px-6 font-medium">
                Punishment
              </TableHead>
              <TableHead className="h-12 px-6 font-medium">Status</TableHead>
              <TableHead className="h-12 px-6 font-medium">Date</TableHead>
              <TableHead className="h-12 px-6 text-right font-medium">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCases.length === 0 ? (
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
                <TableRow key={caseItem.id} className="hover:bg-gray-50/50">
                  <TableCell className="px-6 py-4 font-medium">
                    {caseItem.id}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {caseItem.student}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {caseItem.matricNumber}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {caseItem.offence}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {caseItem.punishment}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge
                      className={cn(
                        "px-3 py-1",
                        caseItem.status === "pending" &&
                          "bg-amber-500 hover:bg-amber-600",
                        caseItem.status === "scheduled" &&
                          "bg-blue-500 hover:bg-blue-600",
                        caseItem.status === "in-progress" &&
                          "bg-indigo-500 hover:bg-indigo-600",
                        caseItem.status === "resolved" &&
                          "bg-emerald-500 hover:bg-emerald-600"
                      )}
                    >
                      {caseItem.status.charAt(0).toUpperCase() +
                        caseItem.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {new Date(caseItem.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem asChild>
                          <button
                            className="flex w-full items-center cursor-pointer"
                            onClick={() => onViewDetails(caseItem.id)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <button
                            className="flex w-full items-center cursor-pointer"
                            onClick={() => handleEdit(caseItem.id)}
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
                            onClick={() => handleDelete(caseItem.id)}
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
