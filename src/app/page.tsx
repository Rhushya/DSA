import Link from 'next/link';
import { Code, Network, Cpu, Database, ArrowRight, BookOpen, Zap, Target, GraduationCap } from 'lucide-react';

const subjects = [
    {
        title: 'Data Structures & Algorithms',
        description: 'Arrays, Linked Lists, Trees, Graphs, Sorting, DP, Backtracking and more',
        href: '/dsa',
        icon: Code,
        gradient: 'linear-gradient(135deg, var(--accent), hsl(0 70% 42%))',
        shadowColor: 'var(--accent-glow)',
    },
    {
        title: 'Computer Networking',
        description: 'OSI Model, TCP/IP, Protocols, Network Security',
        href: '/cn',
        icon: Network,
        gradient: 'linear-gradient(135deg, var(--secondary), hsl(220 90% 50%))',
        shadowColor: 'hsl(210 80% 62% / 0.3)',
    },
    {
        title: 'Operating Systems',
        description: 'Process Management, Memory, Deadlocks, File Systems',
        href: '/os',
        icon: Cpu,
        gradient: 'linear-gradient(135deg, var(--primary), hsl(210 80% 50%))',
        shadowColor: 'hsl(220 90% 56% / 0.3)',
    },
    {
        title: 'SQL & Databases',
        description: 'Queries, Joins, Aggregations, Window Functions, Database Design',
        href: '/sql',
        icon: Database,
        gradient: 'linear-gradient(135deg, var(--sql-color), hsl(0 60% 38%))',
        shadowColor: 'hsl(0 70% 48% / 0.3)',
    },
];

const features = [
    { icon: BookOpen, title: 'Complete Notes', desc: 'Comprehensive coverage of all topics' },
    { icon: Zap, title: 'Code Examples', desc: 'Python code with syntax highlighting' },
    { icon: Target, title: 'Interview Ready', desc: 'Focused on tech placement prep' },
    { icon: GraduationCap, title: 'Well Structured', desc: 'Organized for efficient learning' },
];

export default function Home() {
    return (
        <div style={{ minHeight: 'calc(100vh - 64px)' }}>
            {/* Hero Section */}
            <section
                className="hero-section"
                style={{
                    padding: '5rem 2rem 4rem',
                    textAlign: 'center',
                    maxWidth: '920px',
                    margin: '0 auto',
                }}
            >
                <div className="animate-fade-in-up">
                    <div className="hero-badge" style={{ marginBottom: '1.75rem' }}>
                        <span className="hero-badge-dot" />
                        <span>Complete Study Notes for Tech Interviews</span>
                    </div>
                </div>

                <h1
                    className="hero-title animate-fade-in-up delay-1"
                    style={{
                        fontSize: '3.75rem',
                        fontWeight: 800,
                        color: 'var(--text-primary)',
                        marginBottom: '1.5rem',
                        lineHeight: 1.1,
                        letterSpacing: '-0.035em',
                    }}
                >
                    Master Your Tech
                    <br />
                    <span className="gradient-text">Interview Prep</span>
                </h1>

                <p
                    className="hero-description animate-fade-in-up delay-2"
                    style={{
                        fontSize: '1.2rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '2.5rem',
                        lineHeight: 1.7,
                        maxWidth: '620px',
                        margin: '0 auto 2.5rem',
                    }}
                >
                    Comprehensive study notes covering DSA, Computer Networking, Operating Systems,
                    and SQL. All code examples in Python with syntax highlighting.
                </p>

                <div className="animate-fade-in-up delay-3" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link href="/dsa" className="btn-primary" style={{ padding: '0.875rem 2.25rem', fontSize: '1rem' }}>
                        Start Learning <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link href="/cn" className="btn-secondary" style={{ padding: '0.875rem 2.25rem', fontSize: '1rem' }}>
                        Browse Subjects
                    </Link>
                </div>
            </section>

            {/* Feature Strip */}
            <div className="feature-strip animate-fade-in delay-4">
                {features.map((f, i) => (
                    <div key={i} className="feature-item">
                        <div className="feature-icon">
                            <f.icon className="w-[18px] h-[18px]" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '14px' }}>{f.title}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '12.5px' }}>{f.desc}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Subject Cards */}
            <section style={{ padding: '4rem 2rem 5rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div className="section-label animate-fade-in-up delay-4">
                    <h2>Choose a Subject</h2>
                    <p>Select a topic to start studying</p>
                </div>

                <div className="subject-grid">
                    {subjects.map((subject, idx) => (
                        <Link
                            key={subject.href}
                            href={subject.href}
                            className={`card animate-fade-in-up delay-${Math.min(idx + 3, 6)}`}
                            style={{
                                display: 'block',
                                textDecoration: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div
                                    className="icon-box"
                                    style={{
                                        background: subject.gradient,
                                        boxShadow: `0 4px 15px ${subject.shadowColor}`,
                                    }}
                                >
                                    <subject.icon className="w-6 h-6" style={{ color: 'white' }} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <h3 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: 650,
                                        color: 'var(--text-primary)',
                                        marginBottom: '0.4rem',
                                        letterSpacing: '-0.01em',
                                    }}>
                                        {subject.title}
                                    </h3>
                                    <p style={{
                                        fontSize: '13.5px',
                                        color: 'var(--text-secondary)',
                                        margin: 0,
                                        lineHeight: 1.6,
                                    }}>
                                        {subject.description}
                                    </p>
                                </div>
                                <ArrowRight
                                    className="w-5 h-5"
                                    style={{
                                        color: 'var(--text-muted)',
                                        flexShrink: 0,
                                        marginTop: '2px',
                                        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer
                style={{
                    textAlign: 'center',
                    padding: '2rem',
                    borderTop: '1px solid var(--border)',
                    color: 'var(--text-muted)',
                    fontSize: '13px',
                }}
            >
                <p>Built for efficient learning. Study smart, not hard.</p>
            </footer>
        </div>
    );
}
