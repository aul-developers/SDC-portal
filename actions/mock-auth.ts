
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginMockAdmin() {
    const cookieStore = await cookies();

    // Set a secure mock session cookie
    cookieStore.set("SDC_ADMIN_SESSION", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
    });

    return { success: true };
}

export async function logoutMockAdmin() {
    const cookieStore = await cookies();
    cookieStore.delete("SDC_ADMIN_SESSION");
}

export async function checkMockAdmin() {
    const cookieStore = await cookies();
    return cookieStore.has("SDC_ADMIN_SESSION");
}
