"use server";

import { createClient } from "@/utils/supabase/server";

export async function logAuditAction(action: string, details: any = {}) {
    const supabase = createClient();

    try {
        await supabase.from("audit_logs").insert({
            action,
            details
        });
    } catch (err) {
        // Silently ignore audit logging failures
    }
}
