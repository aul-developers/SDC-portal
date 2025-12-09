"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SessionLogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-sdc-navy">
          Session Logs
        </h1>
        <p className="text-gray-500">View history of committee sessions.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-500">
            No recent session logs found.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
