"use server";

import { createClient } from "@/utils/supabase/server";

// Cache expiration: 5 minutes (Handled by page segment or cache functions)

export async function getDashboardMetrics() {
    try {
        const { checkMockAdmin } = await import("./mock-auth");
        const isMockAdmin = await checkMockAdmin();

        let supabase;
        if (isMockAdmin) {
            // Use Service Role for bypass (Assuming environment variable is available)
            const { createClient: createClientSSR } = await import("@supabase/supabase-js");
            supabase = createClientSSR(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.SUPABASE_SERVICE_ROLE_KEY!
            );
        } else {
            supabase = createClient();
        }

        const [
            { count: total },
            { count: active },
            { count: pending },
            { count: completed }
        ] = await Promise.all([
            // Count all cases
            supabase.from("cases").select("*", { count: "exact", head: true }),

            // Count active cases (not closed)
            supabase.from("cases").select("*", { count: "exact", head: true }).neq("status", "Closed"),

            // Count pending cases
            supabase.from("cases").select("*", { count: "exact", head: true }).eq("status", "Pending"),

            supabase.from("cases").select("*", { count: "exact", head: true }).eq("status", "Closed")
        ]);

        // Get Next Hearing (Earliest upcoming incident_date)
        const { data: nextCase } = await supabase
            .from("cases")
            .select("id, incident_date, incident_time")
            .gte("incident_date", new Date().toISOString().split('T')[0]) // Today or future
            .order("incident_date", { ascending: true })
            .order("incident_time", { ascending: true })
            .limit(1)
            .maybeSingle();

        return {
            totalCases: total || 0,
            activeCases: active || 0,
            pendingHearings: pending || 0,
            resolvedCases: completed || 0,
            nextHearing: nextCase ? {
                date: nextCase.incident_date,
                time: nextCase.incident_time,
                id: nextCase.id
            } : null
        };
    } catch (error) {
        console.error("Error fetching dashboard metrics:", error);
        return {
            totalCases: 0,
            activeCases: 0,
            pendingHearings: 0,
            resolvedCases: 0,
        };
    }
}

export async function getRecentActivities() {
    try {
        const { checkMockAdmin } = await import("./mock-auth");
        const isMockAdmin = await checkMockAdmin();

        let supabase;
        if (isMockAdmin) {
            const { createClient: createClientSSR } = await import("@supabase/supabase-js");
            supabase = createClientSSR(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.SUPABASE_SERVICE_ROLE_KEY!
            );
        } else {
            supabase = createClient();
        }

        const { data, error } = await supabase
            .from("cases")
            .select(`
                id,
                title,
                status,
                created_at,
                priority,
                student:student_id (
                    full_name,
                    matric_no
                )
            `)
            .order("created_at", { ascending: false })
            .limit(5);

        if (error) throw error;

        return data || [];
    } catch (error) {
        console.error("Error fetching recent activities:", error);
        return [];
    }
}

export async function getPendingApprovals() {
    try {
        const { checkMockAdmin } = await import("./mock-auth");
        const isMockAdmin = await checkMockAdmin();

        let supabase;
        if (isMockAdmin) {
            const { createClient: createClientSSR } = await import("@supabase/supabase-js");
            supabase = createClientSSR(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.SUPABASE_SERVICE_ROLE_KEY!
            );
        } else {
            supabase = createClient();
        }

        // Assuming 'approvals' table exists and links to cases
        const { data, error } = await supabase
            .from("approvals")
            .select("*, requester:user_id(full_name)")
            .eq("status", "pending")
            .order("created_at", { ascending: false })
            .limit(5);

        if (error) {
            // Table might not exist yet, return empty array gracefully
            console.warn("Error fetching pending approvals (table might not exist):", error.message);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error("Error in getPendingApprovals:", error);
        return [];
    }
}
