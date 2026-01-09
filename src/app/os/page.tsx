import LeftSidebar from '@/components/LeftSidebar';
import PDFDownload from '@/components/PDFDownload';
import { Cpu, MemoryStick, HardDrive, RefreshCw, FileArchive } from 'lucide-react';

const topics = [
    { icon: Cpu, title: 'Process Management', desc: 'Process states, PCB, context switching, scheduling algorithms' },
    { icon: MemoryStick, title: 'Memory Management', desc: 'Paging, segmentation, virtual memory, page replacement algorithms' },
    { icon: RefreshCw, title: 'Deadlocks', desc: "Prevention, avoidance (Banker's algorithm), detection and recovery" },
    { icon: HardDrive, title: 'Synchronization', desc: 'Semaphores, mutexes, monitors, producer-consumer problem' },
    { icon: FileArchive, title: 'File Systems', desc: 'File allocation methods, directory structures, disk scheduling' },
];

export default function OSPage() {
    return (
        <div className="docs-layout">
            <LeftSidebar />
            <main className="main-content">
                <div className="content-area">
                    <h1>Operating Systems</h1>
                    <p>In-depth study notes on Operating Systems covering process management, memory management, file systems, and essential OS concepts.</p>

                    <h2>Download Notes</h2>
                    <PDFDownload
                        title="Operating Systems Notes"
                        description="Complete OS notes covering processes, threads, scheduling, memory management, file systems, deadlocks."
                        filename="os-notes.pdf"
                        href="/files/os-notes.pdf"
                    />

                    <h2>Key Topics</h2>
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                        {topics.map((topic, i) => (
                            <div key={i} className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFA54E, #F55036)' }}>
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
