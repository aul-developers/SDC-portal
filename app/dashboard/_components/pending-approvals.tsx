"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";

import { logAuditAction } from "@/actions/audit";

interface PendingApprovalsProps {
  initialApprovals: any[];
}

export function PendingApprovals({ initialApprovals }: PendingApprovalsProps) {
  const [approvals, setApprovals] = useState<any[]>(initialApprovals);

  const handleApprove = async (id: number) => {
    toast.success(`Request #${id} approved successfully.`);
    await logAuditAction("Approved Request", { approval_id: id });
    // In a real app, call API to update status, then refresh
    // For now we optimistically remove
    setApprovals((prev) => prev.filter((a) => a.id !== id));
  };

  const handleReject = async (id: number) => {
    toast.error(`Request #${id} rejected.`);
    await logAuditAction("Rejected Request", { approval_id: id });
    setApprovals((prev) => prev.filter((a) => a.id !== id));
  };

  if (!approvals || approvals.length === 0) return null;

  return (
    <div className="bg-sdc-light-blue/20 border border-sdc-blue/20 rounded-[30px] p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-sdc-blue/10 p-2 rounded-full">
            <Clock className="h-5 w-5 text-sdc-blue" />
          </div>
          <h3 className="font-bold text-lg text-sdc-navy">
            Pending Approvals
            <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
              {approvals.length} Action(s) Required
            </span>
          </h3>
        </div>
      </div>

      <div className="space-y-4">
        {approvals.map((request) => (
          <div
            key={request.id}
            className="bg-white rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                  Request
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(request.created_at).toLocaleDateString()}
                </span>
              </div>
              <h4 className="font-bold text-sdc-navy">
                {request.title || "Untitled Request"}
              </h4>
              <p className="text-xs text-gray-500">
                Requested by: {request.requester?.full_name || "Unknown"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => handleReject(request.id)}
                className="bg-white border border-gray-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-100 rounded-xl"
              >
                <XCircle className="h-4 w-4 mr-1" />
                Reject
              </Button>
              <Button
                size="sm"
                onClick={() => handleApprove(request.id)}
                className="bg-sdc-navy hover:bg-sdc-navy/90 text-white border-none rounded-xl"
              >
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Approve
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
