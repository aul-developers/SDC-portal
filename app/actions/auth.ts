"use server";

import { createClient } from "@/utils/supabase/server";

export async function storeSession(accessToken: string, refreshToken: string) {
    try {
        const supabase = createClient();

        // Set the session on the server side
        const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
        });

        if (error) {
            console.error("Server storeSession error:", error);
            return { success: false, error: error.message };
        }

        return { success: true, user: data.user };
    } catch (err: any) {
        console.error("Server storeSession exception:", err);
        return { success: false, error: err.message };
    }
}
