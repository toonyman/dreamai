import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import AdSenseScript from "@/components/AdSenseScript";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Dream Interpretation - AI-Powered Dream Analysis",
    description: "Discover the hidden meanings in your dreams with AI-powered psychological analysis. Free dream interpretation in multiple languages.",
    keywords: ["dream interpretation", "dream analysis", "AI dream", "psychology", "dream meaning"],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <AdSenseScript />
            </head>
            <body className={inter.className}>
                <Navigation />
                <main className="min-h-screen">
                    {children}
                </main>
            </body>
        </html>
    );
}
