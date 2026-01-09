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
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#F55036' }}>
                    <FileText className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{title}</h3>
                    <p style={{ fontSize: '14px', margin: 0, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>{description}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{filename}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                    <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary">
                        <ExternalLink className="w-4 h-4" /> View
                    </a>
                    <a href={href} download={filename} className="btn-secondary">
                        <Download className="w-4 h-4" /> Download
                    </a>
                </div>
            </div>
        </div>
    );
}
