import type React from "react";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import ToasterClient from "@/components/providers/toaster-client";
import { AuthProvider } from "./context/auth-context";
import { createClient } from "@/utils/supabase/server";
import QueryProvider from "@/components/providers/query-provider";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Student Disciplinary Committee Portal",
  description: "University Student Disciplinary Committee Portal",
  icons: {
    icon: "/logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let initialUser = null;

  if (session?.user) {
    let role = session.user.user_metadata?.role || "viewer";

    // Replicate developer override logic server-side for consistency
    if (
      session.user.email === "softdevelopers@aul.edu.ng" ||
      session.user.email === "softdeveloper@aul.edu.ng"
    ) {
      role = "super_admin";
    }

    // Fetch full profile data
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", session.user.id)
      .single();

    initialUser = {
      ...session.user,
      role,
      user_metadata: {
        ...session.user.user_metadata,
        full_name: profile?.full_name || session.user.user_metadata?.full_name,
      },
    };
  }

  return (
    <html lang="en">
      <body className={jost.className}>
        <AuthProvider initialUser={initialUser}>
          <QueryProvider>
            {children}
            <ToasterClient />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
