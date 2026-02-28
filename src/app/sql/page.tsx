import Breadcrumbs from '@/components/Breadcrumbs';
import PDFDownload from '@/components/PDFDownload';
import { Database, ArrowDown } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'SQL & Database Notes — Queries, Joins, Window Functions | StudyNotes',
    description:
        'Free SQL study notes covering queries, joins, aggregations, window functions, CTEs, and database design. Interview-ready with runnable examples.',
};

export default function SQLPage() {
    return (
        <div className="docs-layout">
            <main className="main-content">
                <div className="content-area">
                    <Breadcrumbs items={[{ label: 'SQL & Databases' }]} />
                    <div className="page-hero animate-fade-in-up">
                        <div className="page-hero-icon" style={{ background: 'var(--sql-color)' }}>
                            <Database className="w-7 h-7" style={{ color: 'white' }} />
                        </div>
                        <div>
                            <h1 style={{ marginBottom: '0.5rem' }}>SQL &amp; Databases</h1>
                            <p className="page-hero-desc">Complete SQL study notes and cheat sheets — from basic queries and joins to advanced window functions, CTEs, and database design.</p>
                        </div>
                    </div>

                    <h2 className="animate-fade-in-up delay-1">
                        <ArrowDown className="w-5 h-5 inline-block mr-2" style={{ color: 'var(--primary)' }} />
                        Download Notes
                    </h2>
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                        <PDFDownload title="SQL Notes" description="Comprehensive SQL notes covering DDL, DML, joins, subqueries, window functions." filename="sql-notes.pdf" href="/files/sql-notes.pdf" />
                        <PDFDownload title="SQL Cheat Sheet" description="Quick reference for SQL syntax and common patterns." filename="sql-cheatsheet.pdf" href="/files/sql-cheatsheet.pdf" />
                    </div>
                </div>
            </main>
        </div>
    );
}
