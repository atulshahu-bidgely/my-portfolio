import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "@/components/AnimatedBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Atul Ramgopal Shahu | Senior Data Engineer",
  description: "Senior Data Engineer with 8+ years experience scaling enterprise-grade data platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-background text-foreground overflow-x-hidden`}>
        {/* THIS IS THE SPECIFIC ANIMATED BACKGROUND REQUESTED */}
        <AnimatedBackground />
        {children}
      </body>
    </html>
  );
}