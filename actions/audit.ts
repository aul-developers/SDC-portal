"use server";

import { createClient } from "@/utils/supabase/server";

export async function logAuditAction(action: string, details: any = {}) {
    const supabase = createClient();

    try {
        const { error } = await supabase.from("audit_logs").insert({
            action,
            details
        });

        if (error) {
            console.error("Failed to log audit:", error);
        }
    } catch (err) {
        console.error("Audit log exception:", err);
    }
}
