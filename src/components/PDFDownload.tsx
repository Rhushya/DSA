'use client';

import { useState, useEffect, useCallback } from 'react';
import { Download, ExternalLink, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PDFDownloadProps {
    title: string;
    description: string;
    filename: string;
    href: string;
}

export default function PDFDownload({ title, description, filename, href }: PDFDownloadProps) {
    const [viewerOpen, setViewerOpen] = useState(false);

    const closeViewer = useCallback(() => setViewerOpen(false), []);

    useEffect(() => {
        if (!viewerOpen) return;
        document.body.style.overflow = 'hidden';
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeViewer();
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [viewerOpen, closeViewer]);

    return (
        <>
            <div className="topic-card">
                <div
                    className="icon-box-sm"
                    style={{ background: 'var(--primary)' }}
                >
                    <FileText className="w-5 h-5" style={{ color: 'white' }} />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        marginBottom: '0.25rem',
                        color: 'var(--text-primary)',
                        marginTop: 0,
                    }}>
                        {title}
                    </h3>
                    <p style={{
                        fontSize: '13.5px',
                        margin: 0,
                        marginBottom: '0.5rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                    }}>
                        {description}
                    </p>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{filename}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                    <Button size="sm" onClick={() => setViewerOpen(true)}>
                        <ExternalLink className="w-4 h-4" />
                        <span>View</span>
                    </Button>
                    <Button asChild variant="secondary" size="sm">
                        <a href={href} download={filename}>
                            <Download className="w-4 h-4" />
                            <span>Download</span>
                        </a>
                    </Button>
                </div>
            </div>

            {viewerOpen && (
                <div
                    className="pdf-modal-overlay"
                    onClick={closeViewer}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Viewing ${title}`}
                >
                    <div className="pdf-modal" onClick={e => e.stopPropagation()}>
                        <div className="pdf-modal-header">
                            <div className="pdf-modal-title">
                                <FileText className="w-4 h-4" />
                                <span>{title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button asChild variant="ghost" size="sm">
                                    <a href={href} download={filename}>
                                        <Download className="w-4 h-4" />
                                        Download
                                    </a>
                                </Button>
                                <button
                                    onClick={closeViewer}
                                    className="pdf-modal-close"
                                    aria-label="Close viewer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <iframe
                            src={href}
                            className="pdf-modal-iframe"
                            title={title}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
