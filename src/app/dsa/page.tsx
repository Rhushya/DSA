import LeftSidebar from '@/components/LeftSidebar';
import RightSidebar from '@/components/RightSidebar';
import { getBasicContent, getAdvanceContent } from '@/lib/dsa-content';
import MarkdownContent from '@/components/MarkdownContent';

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
            <LeftSidebar />

            <main className="main-content">
                <div className="content-area">
                    <h1 id="introduction" className="animate-fade-in-up">Data Structures & Algorithms</h1>

                    <p className="animate-fade-in-up delay-1">
                        Complete study notes covering fundamental data structures, algorithms,
                        and problem-solving patterns for tech interviews. All code examples are in Python.
                    </p>

                    <MarkdownContent content={basicContent} />

                    <div className="advance-section" style={{ marginTop: '4rem' }}>
                        <h1 id="advance-dsa" style={{ color: 'var(--accent)' }}>Advanced Topics</h1>
                        <p>Advanced algorithms and data structures including trees, graphs, and optimization techniques.</p>
                        <MarkdownContent content={advanceContent} />
                    </div>
                </div>
            </main>

            <RightSidebar items={tocItems} />
        </div>
    );
}
