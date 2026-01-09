import LeftSidebar from '@/components/LeftSidebar';
import PDFDownload from '@/components/PDFDownload';
import { Network, Wifi, Globe, Lock } from 'lucide-react';

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
                    <h1>Computer Networking</h1>
                    <p>Complete study notes on Computer Networking covering OSI model, TCP/IP, networking protocols, and essential concepts for tech placements.</p>

                    <h2>Download Notes</h2>
                    <PDFDownload
                        title="Computer Networking Notes"
                        description="Comprehensive notes covering OSI Model, TCP/IP, HTTP, DNS, Routing protocols, and more."
                        filename="cn-notes.pdf"
                        href="/files/cn-notes.pdf"
                    />

                    <h2>Key Topics</h2>
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                        {topics.map((topic, i) => (
                            <div key={i} className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3BD0CE, #80D580)' }}>
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
