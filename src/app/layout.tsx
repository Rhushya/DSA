import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "StudyNotes — Free DSA, OS, CN & SQL Interview Notes",
    description:
        "Free, structured study notes for Data Structures & Algorithms, Computer Networking, Operating Systems, and SQL. Python code examples, downloadable PDFs, and interview-focused content.",
    keywords: [
        "DSA notes",
        "study notes",
        "interview prep",
        "data structures",
        "algorithms",
        "computer networking notes",
        "operating systems notes",
        "SQL notes",
        "tech interview",
        "placement preparation",
    ],
    authors: [{ name: "StudyNotes" }],
    openGraph: {
        title: "StudyNotes — Free CS Interview Prep Notes",
        description:
            "Master DSA, Computer Networks, OS & SQL with free, interview-focused study notes. Python code examples & downloadable PDFs.",
        type: "website",
        locale: "en_US",
        siteName: "StudyNotes",
    },
    twitter: {
        card: "summary_large_image",
        title: "StudyNotes — Free CS Interview Prep Notes",
        description:
            "Master DSA, Computer Networks, OS & SQL with free, interview-focused study notes.",
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
                <AnimatedBackground />
                <Header />
                {children}
            </body>
        </html>
    );
}
