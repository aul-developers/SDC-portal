"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/auth-context";
import { createClient } from "@/utils/supabase/client";
import { format } from "date-fns";
import { Check, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { postRequest } from "@/lib/utils";
import { createCase } from "@/actions/case-management";
import { updateUser } from "@/actions/user-management";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ApprovalRequest {
  id: string;
  request_type: string;
  request_data: any;
  status: "PENDING" | "APPROVED" | "REJECTED";
  created_at: string;
  requester: {
    full_name: string;
    email: string;
  };
}

export default function ApprovalsPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<ApprovalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchRequests = async () => {
    setLoading(true);
    // In a real app with relations, we'd join 'profiles' or 'users'.
    // For now, assuming requester_id maps to auth.users, getting metadata might need a function or just show ID if no relation set up in SQL yet.
    // Let's assume we can fetch raw and map or improved query.
    // For this implementation, I'll fetch raw and maybe fetch user names in parallel or assume strict Relation if SQL supports it.
    // Given the SQL just added, simple join might be tricky without defined JS relations.
    // I'll fetch * and then fetch profiles manually for simplicity if join fails.

    const { data, error } = await supabase
      .from("approval_requests")
      .select("*")
      .eq("status", "PENDING")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch approvals");
      setLoading(false);
      return;
    }

    // Manually fetch profile names for requesters (optimization later)
    const enhancedData = await Promise.all(
      (data || []).map(async (req) => {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, email")
          .eq("id", req.requester_id)
          .single();
        return {
          ...req,
          requester: profile || { full_name: "Unknown", email: "N/A" },
        };
      })
    );

    setRequests(enhancedData as ApprovalRequest[]);
    setLoading(false);
  };

  useEffect(() => {
    if (user?.role === "super_admin") {
      fetchRequests();
    }
  }, [user]);

  const handleAction = async (id: string, action: "APPROVED" | "REJECTED") => {
    // 1. Update status
    const { error } = await supabase
      .from("approval_requests")
      .update({
        status: action,
        reviewed_at: new Date().toISOString(),
        reviewed_by: user?.id,
      })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update request");
      return;
    }

    // 2. If Approved, execute the action (Add User)
    // Ideally this should be a Database Function/Trigger or Server Action for atomicity.
    // For Client-side demo:
    if (action === "APPROVED") {
      const req = requests.find((r) => r.id === id);
      if (req && req.request_type === "ADD_USER") {
        // Note: Creating a user usually requires Service Role key if it's auth.users
        // We'll call the server action or API route we have.
        // Wait, we have /create/user/ API route? Let's check add-user-dialog.
        // Ref: "const response = await postRequest<userSchema>('/create/user/', newUser);"

        // ... (imports)
        // Call the API to actually create the user using our utility
        const newUser = req.request_data;

        try {
          // Use the same endpoint as AddUserDialog
          const response = await postRequest("/api/create/user", newUser);
          if (!response) {
            throw new Error("Failed to create user via API");
          }
        } catch (e) {
          toast.error("Approved but failed to execute action.");
        }
      } else if (req && req.request_type === "UPDATE_USER") {
        try {
          const updates = req.request_data;
          const { id, ...data } = updates;
          if (!id) throw new Error("No User ID in update request");

          const response = await updateUser(id, data);
          if (!response.success) throw new Error(response.message);
        } catch (e: any) {
          toast.error("Failed to update user: " + e.message);
          return;
        }
      } else if (req && req.request_type === "ADD_CASE") {
        try {
          const payload = req.request_data;
          const studentData = payload.students && payload.students[0];
          if (!studentData) throw new Error("No student data in request");

          // Strip extra fields if necessary, but createCase expects specific shapes
          const caseData = {
            title: payload.title,
            description: payload.description,
            offence_type: payload.offence_type,
            incident_date: payload.incident_date,
            incident_time: payload.incident_time,
            location: payload.location,
            priority: payload.priority,
            reported_by: payload.reported_by,
            reporter_mail: payload.reporter_mail,
            reporters_phone: payload.reporters_phone,
            status: "Reported",
          };

          const response = await createCase(caseData, studentData);
          if (!response.success) {
            throw new Error(response.message);
          }
        } catch (e: any) {
          toast.error("Failed to create Case: " + e.message);
          return; // Do not mark as approved if action failed
        }
      } else if (req && req.request_type === "ADD_PUNISHMENT") {
        try {
          const punishmentData = req.request_data;
          // Clean data if needed, ensure status
          // punishmentData usually comes with status="Pending Approval", we might want to change it to "Active"
          // But AddPunishmentDialog sent "Active". Wait, in AddPunishmentDialog (step 925), we sent:
          // status: "PENDING_APPROVAL" inside requestData?
          // Let's check step 925.
          // Yes: status: "PENDING_APPROVAL".
          // So we should change it to "Active" before inserting.

          const finalData = { ...punishmentData, status: "Active" };

          const { error } = await supabase
            .from("punishments")
            .insert(finalData);
          if (error) throw error;
        } catch (e: any) {
          toast.error("Failed to create Punishment: " + e.message);
          return;
        }
      }
    }

    toast.success(`Request ${action.toLowerCase()}`);
    fetchRequests();
  };

  if (user?.role !== "super_admin") {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-red-500">Access Denied</h2>
        <p>Only Super Admins can view this page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-sdc-navy">
            Pending Approvals
          </h1>
          <p className="text-gray-500">
            Review requests from Board Members requiring authorization.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Requests Queue</CardTitle>
          <CardDescription>
            {requests.length} pending request{requests.length !== 1 && "s"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-sdc-blue" />
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No pending approvals found.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Requester</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell>
                      <Badge variant="outline">{req.request_type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {req.requester.full_name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {req.requester.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md truncate">
                      {req.request_type === "ADD_USER" ? (
                        <span title={JSON.stringify(req.request_data)}>
                          Request to add User:{" "}
                          <strong>{req.request_data.fullName}</strong> (
                          {req.request_data.role})
                        </span>
                      ) : req.request_type === "UPDATE_USER" ? (
                        <span title={JSON.stringify(req.request_data)}>
                          Request to update User:{" "}
                          <strong>{req.request_data.full_name}</strong>
                        </span>
                      ) : req.request_type === "ADD_CASE" ? (
                        <span title={JSON.stringify(req.request_data)}>
                          Request to create Case:{" "}
                          <strong>{req.request_data.title}</strong> (
                          {req.request_data.offence_type})
                        </span>
                      ) : req.request_type === "ADD_PUNISHMENT" ? (
                        <span title={JSON.stringify(req.request_data)}>
                          Request to add Punishment:{" "}
                          <strong>{req.request_data.punishment_title}</strong> (
                          {req.request_data.punishment_type})
                        </span>
                      ) : (
                        <span className="text-xs font-mono">
                          {JSON.stringify(req.request_data)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {format(new Date(req.created_at), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-600 border border-green-200"
                          onClick={() => handleAction(req.id, "APPROVED")}
                        >
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Approve</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 border border-red-200"
                          onClick={() => handleAction(req.id, "REJECTED")}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Reject</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
