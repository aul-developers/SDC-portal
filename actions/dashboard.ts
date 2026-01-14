"use server";

import { createClient } from "@/utils/supabase/server";



export async function getDashboardMetrics() {
    try {
        const supabase = createClient();

        const [
            { count: total },
            { count: active },
            { count: pending },
            { count: completed }
        ] = await Promise.all([
            supabase.from("cases").select("*", { count: "exact", head: true }),

            supabase.from("cases").select("*", { count: "exact", head: true }).neq("status", "Closed"),

            supabase.from("cases").select("*", { count: "exact", head: true }).eq("status", "Pending"),

            supabase.from("cases").select("*", { count: "exact", head: true }).eq("status", "Closed")
        ]);

        const { data: nextCase } = await supabase
            .from("cases")
            .select("id, incident_date, incident_time")
            .gte("incident_date", new Date().toISOString().split('T')[0])
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
        const supabase = createClient();

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
        return [];
    }
}

export async function getPendingApprovals() {
    try {
        const supabase = createClient();

        // Assuming 'approvals' table exists and links to cases
        const { data, error } = await supabase
            .from("approvals")
            .select("*, requester:user_id(full_name)")
            .eq("status", "pending")
            .order("created_at", { ascending: false })
            .limit(5);

        if (error) {
            return [];
        }

        return data || [];
    } catch (error) {
        return [];
    }
}
