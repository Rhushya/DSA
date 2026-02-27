import LeftSidebar from '@/components/LeftSidebar';
import PDFDownload from '@/components/PDFDownload';
import { Network, Wifi, Globe, Lock, ArrowDown } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Computer Networking Notes — OSI, TCP/IP, Protocols | StudyNotes',
    description:
        'Free computer networking study notes covering the OSI model, TCP/IP, HTTP, DNS, routing protocols and network security. Interview-ready.',
};

const topics = [
    { icon: Network, title: 'OSI Model', desc: '7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application' },
    { icon: Wifi, title: 'TCP/IP Model', desc: '4 layers: Network Access, Internet, Transport, Application' },
    { icon: Globe, title: 'Protocols', desc: 'HTTP/HTTPS, FTP, SMTP, DNS, DHCP, ARP, TCP, UDP, IP' },
    { icon: Lock, title: 'Network Security', desc: 'Firewalls, SSL/TLS, Encryption, VPN, Authentication' },
];

export default function CNPage() {
    return (
        <div className="docs-layout">
            <LeftSidebar />
            <main className="main-content">
                <div className="content-area">
                    <div className="page-hero animate-fade-in-up">
                        <div className="page-hero-icon" style={{ background: 'linear-gradient(135deg, var(--cn-color), hsl(220 90% 50%))' }}>
                            <Network className="w-7 h-7" style={{ color: 'white' }} />
                        </div>
                        <div>
                            <h1 style={{ marginBottom: '0.5rem' }}>Computer Networking</h1>
                            <p className="page-hero-desc">Complete study notes on the OSI model, TCP/IP, networking protocols, and essential concepts for tech placement interviews.</p>
                        </div>
                    </div>

                    <h2 className="animate-fade-in-up delay-1">
                        <ArrowDown className="w-5 h-5 inline-block mr-2" style={{ color: 'var(--primary)' }} />
                        Download Notes
                    </h2>
                    <PDFDownload
                        title="Computer Networking Notes"
                        description="Comprehensive notes covering OSI Model, TCP/IP, HTTP, DNS, Routing protocols, and more."
                        filename="cn-notes.pdf"
                        href="/files/cn-notes.pdf"
                    />

                    <h2 className="animate-fade-in-up delay-2">Key Topics</h2>
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                        {topics.map((topic, i) => (
                            <div key={i} className={`topic-card animate-fade-in-up delay-${Math.min(i + 2, 6)}`}>
                                <div className="icon-box-sm" style={{ background: 'linear-gradient(135deg, var(--cn-color), hsl(220 90% 50%))' }}>
                                    <topic.icon className="w-5 h-5" style={{ color: 'white' }} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-primary)', marginTop: 0 }}>{topic.title}</h3>
                                    <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{topic.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
