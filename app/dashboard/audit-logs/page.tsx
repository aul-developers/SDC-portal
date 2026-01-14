"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function AuditLogsPage() {
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchLogs = async () => {
      // Fetch from 'audit_logs' table
      // If table doesn't exist, this will return error, but we'll handle it gracefully
      const { data, error } = await supabase
        .from("audit_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) {
      } else {
        setAuditLogs(data || []);
      }
      setLoading(false);
    };

    fetchLogs();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-sdc-navy">
          Audit Logs
        </h1>
        <p className="text-gray-500">
          View system activities and security events.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>Recent system actions and events.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input className="pl-9" placeholder="Search logs..." />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-gray-500"
                  >
                    Loading logs...
                  </TableCell>
                </TableRow>
              ) : auditLogs.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-gray-500"
                  >
                    No audit logs found.
                  </TableCell>
                </TableRow>
              ) : (
                auditLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium text-gray-600 text-xs">
                      {new Date(
                        log.created_at || log.timestamp
                      ).toLocaleString()}
                    </TableCell>
                    <TableCell>{log.user_email || log.user}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell className="max-w-md truncate text-gray-500 font-mono text-xs">
                      {typeof log.details === "object"
                        ? JSON.stringify(log.details)
                        : log.details}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          log.status === "success" ? "secondary" : "destructive"
                        }
                        className={
                          log.status === "success"
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : ""
                        }
                      >
                        {log.status || "info"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
