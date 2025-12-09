"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateAlertPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-sdc-navy">
          Create System Alert
        </h1>
        <p className="text-gray-500">Broadcast a new alert to the system.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Alert Title</Label>
              <Input id="title" placeholder="e.g. System Maintenance" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Enter alert details..." />
            </div>
            <div className="pt-2">
              <Button className="bg-sdc-navy text-white hover:bg-sdc-navy/90">
                Broadcast Alert
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
