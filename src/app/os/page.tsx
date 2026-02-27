import LeftSidebar from '@/components/LeftSidebar';
import PDFDownload from '@/components/PDFDownload';
import { Cpu, MemoryStick, HardDrive, RefreshCw, FileArchive, ArrowDown } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Operating Systems Notes — Processes, Memory, Deadlocks | StudyNotes',
    description:
        'Free operating systems study notes covering process management, memory management, deadlocks, file systems and scheduling. Interview-ready.',
};

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
                    <div className="page-hero animate-fade-in-up">
                        <div className="page-hero-icon" style={{ background: 'linear-gradient(135deg, var(--os-color), hsl(210 80% 50%))' }}>
                            <Cpu className="w-7 h-7" style={{ color: 'white' }} />
                        </div>
                        <div>
                            <h1 style={{ marginBottom: '0.5rem' }}>Operating Systems</h1>
                            <p className="page-hero-desc">In-depth study notes on process management, memory, file systems, deadlocks, and essential OS concepts for tech placements.</p>
                        </div>
                    </div>

                    <h2 className="animate-fade-in-up delay-1">
                        <ArrowDown className="w-5 h-5 inline-block mr-2" style={{ color: 'var(--primary)' }} />
                        Download Notes
                    </h2>
                    <PDFDownload
                        title="Operating Systems Notes"
                        description="Complete OS notes covering processes, threads, scheduling, memory management, file systems, deadlocks."
                        filename="os-notes.pdf"
                        href="/files/os-notes.pdf"
                    />

                    <h2 className="animate-fade-in-up delay-2">Key Topics</h2>
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                        {topics.map((topic, i) => (
                            <div key={i} className={`topic-card animate-fade-in-up delay-${Math.min(i + 2, 6)}`}>
                                <div className="icon-box-sm" style={{ background: 'linear-gradient(135deg, var(--os-color), hsl(210 80% 50%))' }}>
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
