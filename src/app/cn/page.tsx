import Breadcrumbs from '@/components/Breadcrumbs';
import PDFDownload from '@/components/PDFDownload';
import { Network, ArrowDown } from 'lucide-react';
import type { Metadata } from 'next';

const siteUrl = 'https://studynotes.vercel.app';

export const metadata: Metadata = {
    title: 'Computer Networking Notes — OSI, TCP/IP, Protocols | StudyNotes',
    description:
        'Free computer networking study notes covering the OSI model, TCP/IP, HTTP, DNS, routing protocols and network security. Downloadable PDF for interview preparation.',
    keywords: ['computer networking notes', 'OSI model', 'TCP/IP', 'HTTP', 'DNS', 'routing protocols', 'network security', 'CN notes', 'interview prep', 'placement preparation'],
    alternates: { canonical: `${siteUrl}/cn` },
    openGraph: {
        title: 'Computer Networking Notes — OSI, TCP/IP, Protocols',
        description: 'Free CN study notes covering OSI, TCP/IP, HTTP, DNS, and more. Downloadable PDF included.',
        url: `${siteUrl}/cn`,
        type: 'article',
    },
};

const cnBreadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Computer Networking', item: `${siteUrl}/cn` },
    ],
};

export default function CNPage() {
    return (
        <div className="docs-layout">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cnBreadcrumbLd) }} />
            <main className="main-content">
                <div className="content-area">
                    <Breadcrumbs items={[{ label: 'Computer Networking' }]} />
                    <div className="page-hero animate-fade-in-up">
                        <div className="page-hero-icon" style={{ background: 'var(--cn-color)' }}>
                            <Network className="w-7 h-7" style={{ color: 'white' }} />
                        </div>
                        <div>
                            <h1 style={{ marginBottom: '0.5rem' }}>Computer Networking</h1>
                            <p className="page-hero-desc">Complete study notes on the OSI model, TCP/IP, networking protocols, and essential concepts for tech placement interviews.</p>
                        </div>
                    </div>

                    <h2 className="animate-fade-in-up delay-1">
                        <ArrowDown className="w-5 h-5 inline-block mr-2" style={{ color: 'var(--primary)' }} />
                        Download Notes
                    </h2>
                    <PDFDownload
                        title="Computer Networking Notes"
                        description="Comprehensive notes covering OSI Model, TCP/IP, HTTP, DNS, Routing protocols, and more."
                        filename="cn-notes.pdf"
                        href="/files/cn-notes.pdf"
                    />
                </div>
            </main>
        </div>
    );
}
