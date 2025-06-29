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
import { Card, CardContent } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Search,
    Filter,
    MoreHorizontal,
    Eye,
    Edit,
    CheckCircle,
    ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFetch } from "@/hooks/useFetch";

// Mock data for punishments

interface PunishmentListProps {
    onViewDetails: (punishmentId: string) => void;
}

export function PunishmentList({ onViewDetails }: PunishmentListProps) {
  
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [typeFilter, setTypeFilter] = useState<string | null>(null);

    // Get unique punishment types for filter
    // const punishmentTypes = Array.from(
    //     new Set(mockPunishments.map((punishment) => punishment.type))
    // );

    // Filter punishments based on search term and filters
    // const filteredPunishments = mockPunishments.filter((punishment) => {
    //   const matchesSearch =
    //     searchTerm === "" ||
    //     punishment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     punishment.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     punishment.student.matricNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     punishment.type.toLowerCase().includes(searchTerm.toLowerCase())

    //   const matchesStatus = statusFilter === null || punishment.status === statusFilter
    //   const matchesType = typeFilter === null || punishment.type === typeFilter

    //   return matchesSearch && matchesStatus && matchesType
    // })

    const handleMarkComplete = (punishmentId: string) => {
        // In a real application, this would call an API to update the punishment status
        alert(`Mark punishment ${punishmentId} as complete`);
    };

    return (
        <>Hello</>
        // <div className="space-y-4">
        //   <Card className="border-none shadow-sm">
        //     <CardContent className="p-4">
        //       <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
        //         <div className="relative flex-1">
        //           <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        //           <Input
        //             type="search"
        //             placeholder="Search by ID, student name, or matric number..."
        //             className="pl-9 h-10 bg-white"
        //             value={searchTerm}
        //             onChange={(e) => setSearchTerm(e.target.value)}
        //           />
        //         </div>

        //         <div className="flex flex-wrap gap-2">
        //           <DropdownMenu>
        //             <DropdownMenuTrigger asChild>
        //               <Button variant="outline" className="h-10 gap-1 bg-white">
        //                 <Filter className="h-4 w-4" />
        //                 <span>
        //                   {statusFilter ? `${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}` : "Status"}
        //                 </span>
        //                 <ChevronDown className="h-3.5 w-3.5 opacity-50" />
        //               </Button>
        //             </DropdownMenuTrigger>
        //             <DropdownMenuContent align="end">
        //               <DropdownMenuItem onClick={() => setStatusFilter(null)}>All Statuses</DropdownMenuItem>
        //               <DropdownMenuItem onClick={() => setStatusFilter("active")}>Active</DropdownMenuItem>
        //               <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
        //               <DropdownMenuItem onClick={() => setStatusFilter("completed")}>Completed</DropdownMenuItem>
        //             </DropdownMenuContent>
        //           </DropdownMenu>

        //           <DropdownMenu>
        //             <DropdownMenuTrigger asChild>
        //               <Button variant="outline" className="h-10 gap-1 bg-white">
        //                 <Filter className="h-4 w-4" />
        //                 <span className="max-w-[150px] truncate">{typeFilter ? `${typeFilter}` : "Punishment Type"}</span>
        //                 <ChevronDown className="h-3.5 w-3.5 opacity-50" />
        //               </Button>
        //             </DropdownMenuTrigger>
        //             <DropdownMenuContent align="end" className="max-h-[300px] overflow-y-auto">
        //               <DropdownMenuItem onClick={() => setTypeFilter(null)}>All Types</DropdownMenuItem>
        //               {punishmentTypes.map((type) => (
        //                 <DropdownMenuItem key={type} onClick={() => setTypeFilter(type)}>
        //                   {type}
        //                 </DropdownMenuItem>
        //               ))}
        //             </DropdownMenuContent>
        //           </DropdownMenu>
        //         </div>
        //       </div>
        //     </CardContent>
        //   </Card>

        //   <Card className="border-none shadow-sm overflow-hidden">
        //     <div className="rounded-md">
        //       <Table>
        //         <TableHeader>
        //           <TableRow className="bg-muted/30 hover:bg-muted/30">
        //             <TableHead>Student</TableHead>
        //             <TableHead>Punishment ID</TableHead>
        //             <TableHead>Type</TableHead>
        //             <TableHead>Duration</TableHead>
        //             <TableHead>Progress</TableHead>
        //             <TableHead>Status</TableHead>
        //             <TableHead className="text-right">Actions</TableHead>
        //           </TableRow>
        //         </TableHeader>
        //         <TableBody>
        //           {filteredPunishments.length === 0 ? (
        //             <TableRow>
        //               <TableCell colSpan={7} className="h-24 text-center">
        //                 No punishments found.
        //               </TableCell>
        //             </TableRow>
        //           ) : (
        //             filteredPunishments.map((punishment) => (
        //               <TableRow key={punishment.id} className="group hover:bg-muted/20">
        //                 <TableCell>
        //                   <div className="flex items-center gap-3">
        //                     <Avatar className="h-9 w-9 border border-border">
        //                       <AvatarImage
        //                         src={punishment.student.image || "/placeholder.svg"}
        //                         alt={punishment.student.name}
        //                       />
        //                       <AvatarFallback>
        //                         {punishment.student.name
        //                           .split(" ")
        //                           .map((n) => n[0])
        //                           .join("")}
        //                       </AvatarFallback>
        //                     </Avatar>
        //                     <div>
        //                       <div className="font-medium text-sdc-navy">{punishment.student.name}</div>
        //                       <div className="text-xs text-sdc-gray">{punishment.student.matricNumber}</div>
        //                     </div>
        //                   </div>
        //                 </TableCell>
        //                 <TableCell className="font-medium">{punishment.id}</TableCell>
        //                 <TableCell>{punishment.type}</TableCell>
        //                 <TableCell>
        //                   <div className="text-sm">
        //                     <div>{new Date(punishment.startDate).toLocaleDateString()}</div>
        //                     <div className="text-muted-foreground">
        //                       to {new Date(punishment.endDate).toLocaleDateString()}
        //                     </div>
        //                   </div>
        //                 </TableCell>
        //                 <TableCell>
        //                   <div className="w-full">
        //                     <div className="flex items-center justify-between mb-1">
        //                       <span className="text-xs font-medium">{punishment.progress}%</span>
        //                     </div>
        //                     <div className="w-full bg-gray-200 rounded-full h-2">
        //                       <div
        //                         className={cn(
        //                           "h-2 rounded-full",
        //                           punishment.status === "completed" ? "bg-emerald-500" : "bg-blue-500",
        //                         )}
        //                         style={{ width: `${punishment.progress}%` }}
        //                       ></div>
        //                     </div>
        //                   </div>
        //                 </TableCell>
        //                 <TableCell>
        //                   <Badge
        //                     className={cn(
        //                       punishment.status === "active" && "bg-amber-500 hover:bg-amber-600",
        //                       punishment.status === "pending" && "bg-blue-500 hover:bg-blue-600",
        //                       punishment.status === "completed" && "bg-emerald-500 hover:bg-emerald-600",
        //                     )}
        //                   >
        //                     {punishment.status.charAt(0).toUpperCase() + punishment.status.slice(1)}
        //                   </Badge>
        //                 </TableCell>
        //                 <TableCell className="text-right">
        //                   <DropdownMenu>
        //                     <DropdownMenuTrigger asChild>
        //                       <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
        //                         <span className="sr-only">Open menu</span>
        //                         <MoreHorizontal className="h-4 w-4" />
        //                       </Button>
        //                     </DropdownMenuTrigger>
        //                     <DropdownMenuContent align="end">
        //                       <DropdownMenuItem asChild>
        //                         <button
        //                           className="flex w-full items-center cursor-pointer"
        //                           onClick={() => onViewDetails(punishment.id)}
        //                         >
        //                           <Eye className="mr-2 h-4 w-4" />
        //                           View Details
        //                         </button>
        //                       </DropdownMenuItem>
        //                       <DropdownMenuItem asChild>
        //                         <button
        //                           className="flex w-full items-center cursor-pointer"
        //                           onClick={() => handleMarkComplete(punishment.id)}
        //                           disabled={punishment.status === "completed"}
        //                         >
        //                           <CheckCircle className="mr-2 h-4 w-4" />
        //                           Mark as Complete
        //                         </button>
        //                       </DropdownMenuItem>
        //                       <DropdownMenuItem asChild>
        //                         <button
        //                           className="flex w-full items-center cursor-pointer"
        //                           onClick={() => onViewDetails(punishment.id)}
        //                         >
        //                           <Edit className="mr-2 h-4 w-4" />
        //                           Update Progress
        //                         </button>
        //                       </DropdownMenuItem>
        //                     </DropdownMenuContent>
        //                   </DropdownMenu>
        //                 </TableCell>
        //               </TableRow>
        //             ))
        //           )}
        //         </TableBody>
        //       </Table>
        //     </div>
        //   </Card>

        //   <div className="flex items-center justify-between text-sm text-muted-foreground">
        //     <div>
        //       Showing {filteredPunishments.length} of {mockPunishments.length} punishments
        //     </div>
        //     <div className="flex items-center gap-2">
        //       <Button variant="outline" size="sm" disabled>
        //         Previous
        //       </Button>
        //       <Button variant="outline" size="sm" disabled>
        //         Next
        //       </Button>
        //     </div>
        //   </div>
        // </div>
    );
}
