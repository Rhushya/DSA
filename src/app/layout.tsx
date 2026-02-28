import type { Metadata } from "next";
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import Header from "@/components/Header";
import ScrollAnimations from "@/components/ScrollAnimations";

const AnimatedBackground = dynamic(() => import("@/components/AnimatedBackground"));
const WelcomeToast = dynamic(() => import("@/components/WelcomeToast"));

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["600", "700"],
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
    display: "swap",
});

const siteUrl = "https://studynotes.vercel.app";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "StudyNotes — Free DSA, OS, CN & SQL Interview Notes",
        template: "%s | StudyNotes",
    },
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
        "coding interview",
        "Python DSA",
        "free CS notes",
        "computer science notes",
        "GATE preparation",
        "programming notes",
    ],
    authors: [{ name: "StudyNotes" }],
    openGraph: {
        title: "StudyNotes — Free CS Interview Prep Notes",
        description:
            "Master DSA, Computer Networks, OS & SQL with free, interview-focused study notes. Python code examples & downloadable PDFs.",
        type: "website",
        locale: "en_US",
        siteName: "StudyNotes",
        url: siteUrl,
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
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: { icon: "/favicon.svg" },
    alternates: {
        canonical: siteUrl,
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "StudyNotes",
    url: siteUrl,
    description:
        "Free, structured study notes for DSA, Computer Networking, OS, and SQL — built for tech interview preparation.",
    potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark');document.documentElement.classList.add('light')}else{document.documentElement.classList.add('dark');document.documentElement.classList.remove('light')}}catch(e){}})()`,
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
                <AnimatedBackground />
                <Header />
                {children}
                <WelcomeToast />
                <ScrollAnimations />
            </body>
        </html>
    );
}
