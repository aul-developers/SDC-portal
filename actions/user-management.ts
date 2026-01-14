"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { logAuditAction } from "@/actions/audit";

// ... (imports remain)

export async function getUsers() {
    // ... (logic remains same)
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        }
    );

    try {
        const { data: { users }, error } = await supabase.auth.admin.listUsers();

        // ... (error handling)

        if (error) {
            throw new Error(error.message);
        }

        // Fetch profiles to merge roles correctly (in case metadata is stale)
        const { data: profiles, error: profileError } = await supabase
            .from("profiles")
            .select("id, role, full_name, department, status");

        const profileMap = new Map(profiles?.map(p => [p.id, p]));

        // Map Auth Users to a friendly format
        const mappedUsers = users.map((u) => {
            const profile = profileMap.get(u.id);
            return {
                id: u.id,
                email: u.email,
                // Prioritize Profile data, fallback to metadata
                full_name: profile?.full_name || u.user_metadata?.full_name || "Unknown User",
                role: profile?.role || u.user_metadata?.role || "viewer",
                avatar_url: u.user_metadata?.avatar_url,
                last_sign_in_at: u.last_sign_in_at,
                created_at: u.created_at,
                status: profile?.status || "active"
            };
        });

        return mappedUsers;
    } catch (error: any) {
        throw new Error(error.message || "Failed to fetch users");
    }
}


export async function getUser(userId: string) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        }
    );

    try {
        // Fetch Auth User
        const { data: { user }, error: authError } = await supabase.auth.admin.getUserById(userId);
        if (authError || !user) throw new Error(authError?.message || "User not found in Auth");

        // Fetch Profile
        const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single();

        // If profile missing (shouldn't happen with our fixes, but robust fallback)
        // profile might be null if error allows it? No, single() errors if null.
        // We'll proceed even if profile fails, using Auth data.

        return {
            id: user.id,
            email: user.email,
            full_name: profile?.full_name || user.user_metadata?.full_name || "",
            role: profile?.role || user.user_metadata?.role || "viewer",
            phone_no: profile?.phone_no || user.phone || "",
            avatar_url: profile?.avatar_url || user.user_metadata?.avatar_url,
            department: profile?.department || "",
            status: profile?.status || 'active'
        };

    } catch (error: any) {
        throw new Error(error.message || "Failed to fetch user");
    }
}


export async function createUser(userData: any) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        }
    );

    try {
        const { data: user, error } = await supabase.auth.admin.createUser({
            email: userData.email,
            password: userData.password,
            email_confirm: true,
            user_metadata: {
                full_name: userData.fullName,
                // Store role in metadata too for redundancy
                role: userData.role
            }
        });

        if (error) {
            throw new Error(error.message);
        }

        // Step 2: GUARANTEED Profile Creation (Upsert)
        if (user.user) {
            const { error: updateError } = await supabase
                .from("profiles")
                .upsert({
                    id: user.user.id,
                    email: user.user.email, // Ensure email is in profile if needed
                    full_name: userData.fullName,
                    role: userData.role,
                    department: userData.department,
                    status: 'active'
                }, { onConflict: 'id' });

            if (updateError) {
                await logAuditAction("USER_CREATION_PROFILE_FAIL", { userId: user.user.id, error: updateError.message });
                // Return error so user sees it.
                return { success: false, message: "Profile creation failed: " + updateError.message + ". The user account was created, but their profile data is missing." };
            }
        }

        // Log Success
        await logAuditAction("USER_CREATED_MANUAL", { userId: user.user?.id, email: userData.email, role: userData.role });

        revalidatePath("/dashboard/users");
        return { success: true, message: "User created successfully", user };
    } catch (error: any) {
        throw new Error(error.message || "Failed to create user");
    }
}

export async function deleteUser(userId: string) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        }
    );

    try {
        // 1. Delete from audit_logs
        await supabase.from("audit_logs").delete().eq("user_id", userId);
        // 2. Delete from profiles
        await supabase.from("profiles").delete().eq("id", userId);
        // 3. Delete from Auth
        const { error } = await supabase.auth.admin.deleteUser(userId);

        if (error) {
            await logAuditAction("USER_DELETION_FAILED", { userId, error: error.message });
            return { success: false, message: error.message };
        }

        await logAuditAction("USER_DELETED", { targetUserId: userId });
        revalidatePath("/dashboard/users");
        return { success: true, message: "User deleted successfully" };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function updateUser(userId: string, data: { full_name?: string; phone_no?: string; role?: string }) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        }
    );

    try {
        // Update attributes in Profiles table
        const { error: profileError } = await supabase
            .from("profiles")
            .update(data)
            .eq("id", userId);

        if (profileError) {
            throw new Error(profileError.message);
        }

        // Sync to Auth Metadata if role or name changed
        if (data.role || data.full_name) {
            await supabase.auth.admin.updateUserById(userId, {
                user_metadata: {
                    ...data // This will merge/overwrite keys
                }
            });
        }

        await logAuditAction("USER_UPDATED", { userId, changes: data });
        revalidatePath("/dashboard/users");
        return { success: true, message: "User updated successfully" };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}
