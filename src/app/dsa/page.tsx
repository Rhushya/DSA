import LeftSidebar from '@/components/LeftSidebar';
import RightSidebar from '@/components/RightSidebar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getBasicContent, getAdvanceContent } from '@/lib/dsa-content';
import MarkdownContent from '@/components/MarkdownContent';
import { Code } from 'lucide-react';
import type { Metadata } from 'next';

const siteUrl = 'https://studynotes.vercel.app';

export const metadata: Metadata = {
    title: 'DSA Notes — Arrays, Trees, Graphs, DP & More | StudyNotes',
    description:
        'Free Data Structures & Algorithms study notes with Python code examples. Covers arrays, linked lists, trees, graphs, dynamic programming, and 50+ coding patterns for tech interviews.',
    keywords: ['DSA notes', 'data structures', 'algorithms', 'Python DSA', 'arrays', 'linked lists', 'trees', 'graphs', 'dynamic programming', 'interview prep', 'coding patterns', 'placement preparation'],
    alternates: { canonical: `${siteUrl}/dsa` },
    openGraph: {
        title: 'DSA Notes — Arrays, Trees, Graphs, DP & More',
        description: 'Free Data Structures & Algorithms study notes with Python code examples. 12 chapters covering 50+ patterns.',
        url: `${siteUrl}/dsa`,
        type: 'article',
    },
};

const dsaBreadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'DSA', item: `${siteUrl}/dsa` },
    ],
};

const tocItems = [
    { id: 'arrays', title: 'Arrays' },
    { id: 'linked-lists', title: 'Linked Lists' },
    { id: 'sorting', title: 'Sorting' },
    { id: 'binary-search', title: 'Binary Search' },
    { id: 'trees', title: 'Trees' },
    { id: 'backtracking', title: 'Backtracking' },
    { id: 'heap--priority-queue', title: 'Heap / Priority Queue' },
    { id: 'hashing', title: 'Hashing' },
    { id: 'graphs', title: 'Graphs' },
    { id: 'dynamic-programming', title: 'Dynamic Programming' },
    { id: 'bit-manipulation', title: 'Bit Manipulation' },
    { id: 'advance-dsa', title: 'Advanced Topics' },
];

export default function DSAPage() {
    const basicContent = getBasicContent();
    const advanceContent = getAdvanceContent();

    return (
        <div className="docs-layout">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dsaBreadcrumbLd) }} />
            <LeftSidebar />

            <main className="main-content">
                <div className="content-area">
                    <Breadcrumbs items={[{ label: 'DSA' }]} />
                    <div className="page-hero animate-fade-in-up">
                        <div className="page-hero-icon" style={{ background: 'var(--dsa-color)' }}>
                            <Code className="w-7 h-7" style={{ color: 'white' }} />
                        </div>
                        <div>
                            <h1 id="introduction" style={{ marginBottom: '0.5rem' }}>Data Structures & Algorithms</h1>
                            <p className="page-hero-desc">
                                Complete study notes covering fundamental data structures, algorithms,
                                and problem-solving patterns for tech interviews. All code examples are in Python.
                            </p>
                        </div>
                    </div>

                    <MarkdownContent content={basicContent} />

                    <div className="advance-section" style={{ marginTop: '4rem' }}>
                        <h1 id="advance-dsa" style={{ color: 'var(--primary-light)' }}>Advanced Topics</h1>
                        <p>Advanced algorithms and data structures including trees, graphs, and optimization techniques.</p>
                        <MarkdownContent content={advanceContent} />
                    </div>
                </div>
            </main>

            <RightSidebar items={tocItems} />
        </div>
    );
}
