import LeftSidebar from '@/components/LeftSidebar';
import PDFDownload from '@/components/PDFDownload';
import { Database, Search, Table, Layers, Key } from 'lucide-react';

const topics = [
    { icon: Search, title: 'Basic Queries', desc: 'SELECT, WHERE, ORDER BY, GROUP BY, HAVING, LIMIT, DISTINCT' },
    { icon: Layers, title: 'Joins', desc: 'INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF JOIN' },
    { icon: Table, title: 'Aggregations', desc: 'COUNT, SUM, AVG, MIN, MAX with GROUP BY' },
    { icon: Database, title: 'Advanced SQL', desc: 'Window functions, CTEs, subqueries, CASE statements' },
    { icon: Key, title: 'Database Design', desc: 'Normalization, indexes, constraints, ACID properties' },
];

export default function SQLPage() {
    return (
        <div className="docs-layout">
            <LeftSidebar />
            <main className="main-content">
                <div className="content-area">
                    <h1>SQL & Databases</h1>
                    <p>Complete SQL study notes and cheat sheets covering queries, joins, aggregations, and advanced SQL concepts.</p>

                    <h2>Download Notes</h2>
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                        <PDFDownload title="SQL Notes" description="Comprehensive SQL notes covering DDL, DML, joins, subqueries, window functions." filename="sql-notes.pdf" href="/files/sql-notes.pdf" />
                        <PDFDownload title="SQL Cheat Sheet" description="Quick reference for SQL syntax and common patterns." filename="sql-cheatsheet.pdf" href="/files/sql-cheatsheet.pdf" />
                    </div>

                    <h2>Key Topics</h2>
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                        {topics.map((topic, i) => (
                            <div key={i} className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #80D580, #3BD0CE)' }}>
                                    <topic.icon className="w-5 h-5 text-black" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-primary)', marginTop: 0 }}>{topic.title}</h3>
                                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)' }}>{topic.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
