"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AlertDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-sdc-navy">
          System Alert
        </h1>
        <p className="text-gray-500">Details for alert ID: {params.id}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alert Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center text-gray-500">
            This is a placeholder details page for system alert #{params.id}.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
