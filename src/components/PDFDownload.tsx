import { Download, ExternalLink, FileText } from 'lucide-react';

interface PDFDownloadProps {
    title: string;
    description: string;
    filename: string;
    href: string;
}

export default function PDFDownload({ title, description, filename, href }: PDFDownloadProps) {
    return (
        <div className="topic-card">
            <div
                className="icon-box-sm"
                style={{ background: 'var(--gradient-primary)' }}
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
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ padding: '0.5rem 1rem', fontSize: '13px' }}
                >
                    <ExternalLink className="w-4 h-4" />
                    <span>View</span>
                </a>
                <a
                    href={href}
                    download={filename}
                    className="btn-secondary"
                    style={{ padding: '0.5rem 1rem', fontSize: '13px' }}
                >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                </a>
            </div>
        </div>
    );
}
