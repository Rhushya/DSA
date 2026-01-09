import { Download, ExternalLink, FileText } from 'lucide-react';

interface PDFDownloadProps {
    title: string;
    description: string;
    filename: string;
    href: string;
}

export default function PDFDownload({ title, description, filename, href }: PDFDownloadProps) {
    return (
        <div className="card">
            <div className="flex items-start gap-4">
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: '#F55036' }}
                >
                    <FileText className="w-5 h-5" style={{ color: 'white' }} />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
                        {title}
                    </h3>
                    <p style={{ fontSize: '14px', margin: 0, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                        {description}
                    </p>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{filename}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.625rem 1.25rem',
                            background: '#F55036',
                            color: '#FFFFFF',
                            borderRadius: '6px',
                            fontWeight: 500,
                            fontSize: '14px',
                            textDecoration: 'none',
                        }}
                    >
                        <ExternalLink className="w-4 h-4" style={{ color: '#FFFFFF' }} />
                        <span style={{ color: '#FFFFFF' }}>View</span>
                    </a>
                    <a
                        href={href}
                        download={filename}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.625rem 1.25rem',
                            background: 'var(--card-bg)',
                            color: 'var(--primary)',
                            borderRadius: '6px',
                            fontWeight: 500,
                            fontSize: '14px',
                            textDecoration: 'none',
                            border: '1px solid var(--border)',
                        }}
                    >
                        <Download className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                        <span>Download</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
