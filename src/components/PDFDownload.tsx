import { Download, ExternalLink, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
                <Button asChild size="sm">
                    <a href={href} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        <span>View</span>
                    </a>
                </Button>
                <Button asChild variant="secondary" size="sm">
                    <a href={href} download={filename}>
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                    </a>
                </Button>
            </div>
        </div>
    );
}
