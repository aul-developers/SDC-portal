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
    <div className="w-full overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-50 hover:bg-transparent">
            <TableHead className="w-[300px] text-xs font-bold text-gray-400 uppercase tracking-wider pl-4 h-10">
              Student
            </TableHead>
            <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider h-10">
              Offense
            </TableHead>
            <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider h-10">
              Status
            </TableHead>
            <TableHead className="text-xs font-bold text-gray-400 uppercase tracking-wider text-right pr-4 h-10">
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
              <TableCell className="font-medium pl-4 py-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border border-gray-100">
                    <AvatarImage src={item.student.avatar} />
                    <AvatarFallback className="bg-sdc-blue/5 text-sdc-blue font-bold text-xs">
                      {item.student.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-sdc-navy text-sm leading-tight">
                      {item.student.name}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {item.student.matric}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <p className="font-medium text-sdc-navy text-sm">
                  {item.offense}
                </p>
                <span
                  className={`inline-block mt-1 text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                    item.severity === "High"
                      ? "bg-red-50 text-red-500 border-red-100"
                      : item.severity === "Medium"
                      ? "bg-orange-50 text-orange-500 border-orange-100"
                      : "bg-green-50 text-green-500 border-green-100"
                  }`}
                >
                  {item.severity} Priority
                </span>
              </TableCell>
              <TableCell>
                <div
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                    item.status === "Active"
                      ? "bg-sdc-pink-dim text-sdc-pink"
                      : item.status === "Completed"
                      ? "bg-sdc-blue-dim text-sdc-blue"
                      : item.status === "Pending"
                      ? "bg-orange-50 text-orange-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                      item.status === "Active"
                        ? "bg-sdc-pink"
                        : item.status === "Completed"
                        ? "bg-sdc-blue"
                        : item.status === "Pending"
                        ? "bg-orange-500"
                        : "bg-gray-400"
                    }`}
                  ></div>
                  {item.status}
                </div>
              </TableCell>
              <TableCell className="text-right pr-4">
                <span className="text-xs font-bold text-gray-400">
                  {item.date}
                </span>
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
