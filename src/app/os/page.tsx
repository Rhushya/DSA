import Breadcrumbs from '@/components/Breadcrumbs';
import PDFDownload from '@/components/PDFDownload';
import { Cpu, ArrowDown } from 'lucide-react';
import type { Metadata } from 'next';

const siteUrl = 'https://studynotes.vercel.app';

export const metadata: Metadata = {
    title: 'Operating Systems Notes — Processes, Memory, Deadlocks | StudyNotes',
    description:
        'Free operating systems study notes covering process management, memory management, deadlocks, file systems, scheduling, and synchronization. Downloadable PDF for placement preparation.',
    keywords: ['operating systems notes', 'OS notes', 'process management', 'memory management', 'deadlocks', 'file systems', 'scheduling', 'interview prep', 'placement preparation'],
    alternates: { canonical: `${siteUrl}/os` },
    openGraph: {
        title: 'Operating Systems Notes — Processes, Memory, Deadlocks',
        description: 'Free OS study notes covering processes, memory, deadlocks, and more. Downloadable PDF included.',
        url: `${siteUrl}/os`,
        type: 'article',
    },
};

const osBreadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Operating Systems', item: `${siteUrl}/os` },
    ],
};

export default function OSPage() {
    return (
        <div className="docs-layout">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(osBreadcrumbLd) }} />
            <main className="main-content">
                <div className="content-area">
                    <Breadcrumbs items={[{ label: 'Operating Systems' }]} />
                    <div className="page-hero animate-fade-in-up">
                        <div className="page-hero-icon" style={{ background: 'var(--os-color)' }}>
                            <Cpu className="w-7 h-7" style={{ color: 'white' }} />
                        </div>
                        <div>
                            <h1 style={{ marginBottom: '0.5rem' }}>Operating Systems</h1>
                            <p className="page-hero-desc">In-depth study notes on process management, memory, file systems, deadlocks, and essential OS concepts for tech placements.</p>
                        </div>
                    </div>

                    <h2 className="animate-fade-in-up delay-1">
                        <ArrowDown className="w-5 h-5 inline-block mr-2" style={{ color: 'var(--primary)' }} />
                        Download Notes
                    </h2>
                    <PDFDownload
                        title="Operating Systems Notes"
                        description="Complete OS notes covering processes, threads, scheduling, memory management, file systems, deadlocks."
                        filename="os-notes.pdf"
                        href="/files/os-notes.pdf"
                    />
                </div>
            </main>
        </div>
    );
}
