"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-sdc-navy">
          Help & Support
        </h1>
        <p className="text-gray-500">Get assistance and view documentation.</p>
      </div>
      <Card>
        <CardContent className="p-8 text-center text-gray-500">
          Help resources coming soon.
        </CardContent>
      </Card>
    </div>
  );
}
