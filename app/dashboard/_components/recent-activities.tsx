"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const activities = [
  {
    id: "1",
    student: {
      name: "John Doe",
      matric: "AUL/SCI/21/0045",
      avatar: "/placeholder.svg",
      initials: "JD",
    },
    offense: "Examination Malpractice",
    status: "Active",
    date: "Dec 8, 2024",
    severity: "High",
  },
  {
    id: "2",
    student: {
      name: "Sarah Smith",
      matric: "AUL/HUM/20/0112",
      avatar: "/placeholder.svg",
      initials: "SS",
    },
    offense: "Dress Code Violation",
    status: "Completed",
    date: "Dec 7, 2024",
    severity: "Low",
  },
  {
    id: "3",
    student: {
      name: "Michael Brown",
      matric: "AUL/SOC/22/0334",
      avatar: "/placeholder.svg",
      initials: "MB",
    },
    offense: "Unruly Behavior",
    status: "Pending",
    date: "Dec 6, 2024",
    severity: "Medium",
  },
  {
    id: "4",
    student: {
      name: "Emily Davis",
      matric: "AUL/SCI/21/0099",
      avatar: "/placeholder.svg",
      initials: "ED",
    },
    offense: "Late Submission",
    status: "Warning",
    date: "Dec 5, 2024",
    severity: "Low",
  },
];

export function RecentActivities() {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-100 hover:bg-transparent">
            <TableHead className="w-[300px] text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-4 h-12">
              Student
            </TableHead>
            <TableHead className="text-[11px] font-bold text-gray-400 uppercase tracking-widest h-12">
              Offense
            </TableHead>
            <TableHead className="text-[11px] font-bold text-gray-400 uppercase tracking-widest h-12">
              Status
            </TableHead>
            <TableHead className="text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right pr-4 h-12">
              Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((item) => (
            <TableRow
              key={item.id}
              className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors group cursor-pointer"
            >
              <TableCell className="pl-4 py-5">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10 border border-gray-100 bg-gray-50">
                    <AvatarImage src={item.student.avatar} />
                    <AvatarFallback className="bg-gray-100 text-gray-500 font-bold text-xs">
                      {item.student.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-sdc-navy text-sm leading-tight mb-1">
                      {item.student.name}
                    </p>
                    <p className="text-[11px] font-medium text-gray-400 tracking-wide">
                      {item.student.matric}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-5">
                <div className="flex flex-col gap-2">
                  <p className="font-bold text-sdc-navy text-sm">
                    {item.offense}
                  </p>
                  <span
                    className={`inline-flex w-fit items-center text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                      item.severity === "High"
                        ? "bg-red-50 text-red-600 border-red-100"
                        : item.severity === "Medium"
                        ? "bg-orange-50 text-orange-600 border-orange-100"
                        : "bg-green-50 text-green-600 border-green-100"
                    }`}
                  >
                    {item.severity} Priority
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-5">
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border ${
                    item.status === "Active"
                      ? "bg-pink-50 text-pink-600 border-pink-100" // Closer match to screenshot pink
                      : item.status === "Completed"
                      ? "bg-blue-50 text-blue-600 border-blue-100"
                      : item.status === "Pending"
                      ? "bg-orange-50 text-orange-600 border-orange-100"
                      : "bg-gray-100 text-gray-500 border-gray-200"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full mr-2 ${
                      item.status === "Active"
                        ? "bg-pink-500"
                        : item.status === "Completed"
                        ? "bg-blue-500"
                        : item.status === "Pending"
                        ? "bg-orange-500"
                        : "bg-gray-500"
                    }`}
                  ></div>
                  {item.status}
                </div>
              </TableCell>
              <TableCell className="text-right pr-4 py-5">
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[11px] font-bold text-gray-400 uppercase">
                    Dec
                  </span>
                  <span className="text-sm font-bold text-gray-600">
                    {item.date.split(" ")[1].replace(",", "")}
                  </span>
                  <span className="text-[11px] font-bold text-gray-400">
                    {item.date.split(" ")[2]}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-6 flex justify-center pb-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-sdc-blue hover:text-sdc-blue hover:bg-sdc-blue/5 font-bold text-xs"
        >
          View All Cases &rarr;
        </Button>
      </div>
    </div>
  );
}
