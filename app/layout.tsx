import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToasterClient from "@/components/toasterClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Student Disciplinary Committee Portal",
  description: "University Student Disciplinary Committee Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ToasterClient />
      </body>
    </html>
  );
}
