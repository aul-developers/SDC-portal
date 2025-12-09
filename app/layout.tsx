import type React from "react";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import ToasterClient from "@/components/toasterClient";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Student Disciplinary Committee Portal",
  description: "University Student Disciplinary Committee Portal",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jost.className}>
        {children}
        <ToasterClient />
      </body>
    </html>
  );
}
