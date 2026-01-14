"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface RecentActivitiesProps {
  activities: any[];
}

export function RecentActivities({ activities }: RecentActivitiesProps) {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-100 hover:bg-transparent">
            <TableHead className="w-[300px] text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-4 h-12">
              Student
            </TableHead>
            <TableHead className="text-[11px] font-bold text-gray-400 uppercase tracking-widest h-12">
              Case Title / Offense
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
          {activities.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-gray-400">
                No recent cases found.
              </TableCell>
            </TableRow>
          ) : (
            activities.map((item) => (
              <TableRow
                key={item.id}
                className="border-b border-gray-50 last:border-0 cursor-pointer"
              >
                <TableCell className="pl-4 py-5">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 border border-gray-100 bg-gray-50">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-gray-100 text-gray-500 font-bold text-xs">
                        {item.student?.full_name?.charAt(0) || "S"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-sdc-navy text-sm leading-tight mb-1">
                        {item.student?.full_name || "Unknown Student"}
                      </p>
                      <p className="text-[11px] font-medium text-gray-400 tracking-wide">
                        {item.student?.matric_no || "No Matric"}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-5">
                  <div className="flex flex-col gap-2">
                    <p className="font-bold text-sdc-navy text-sm">
                      {item.title}
                    </p>
                    <span
                      className={`inline-flex w-fit items-center text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                        item.priority === "High"
                          ? "bg-red-50 text-red-600 border-red-100"
                          : "bg-green-50 text-green-600 border-green-100"
                      }`}
                    >
                      {item.priority || "Normal"} Priority
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-5">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border bg-gray-100 text-gray-500 border-gray-200">
                    {item.status}
                  </div>
                </TableCell>
                <TableCell className="text-right pr-4 py-5">
                  <span className="text-sm font-bold text-gray-600">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
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
