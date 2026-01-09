import Link from 'next/link';
import { Code, Network, Cpu, Database, ArrowRight, BookOpen, Zap, Target } from 'lucide-react';

const subjects = [
    {
        title: 'Data Structures & Algorithms',
        description: 'Arrays, Linked Lists, Trees, Graphs, Sorting, DP, Backtracking and more',
        href: '/dsa',
        icon: Code,
        color: '#F55036',
    },
    {
        title: 'Computer Networking',
        description: 'OSI Model, TCP/IP, Protocols, Network Security',
        href: '/cn',
        icon: Network,
        color: '#3BD0CE',
    },
    {
        title: 'Operating Systems',
        description: 'Process Management, Memory, Deadlocks, File Systems',
        href: '/os',
        icon: Cpu,
        color: '#FFA54E',
    },
    {
        title: 'SQL & Databases',
        description: 'Queries, Joins, Aggregations, Window Functions, Database Design',
        href: '/sql',
        icon: Database,
        color: '#80D580',
    },
];

const features = [
    { icon: BookOpen, title: 'Complete Notes', desc: 'Comprehensive coverage of all topics' },
    { icon: Zap, title: 'Code Examples', desc: 'Python code with syntax highlighting' },
    { icon: Target, title: 'Interview Ready', desc: 'Focused on tech placement prep' },
];

export default function Home() {
    return (
        <div style={{ minHeight: 'calc(100vh - 56px)', background: 'var(--background)' }}>
            {/* Hero Section */}
            <div style={{ padding: '6rem 2rem 4rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: 'var(--card-bg)',
                    borderRadius: '9999px',
                    marginBottom: '1.5rem',
                    border: '1px solid var(--border)'
                }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#80D580' }} />
                    <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Complete Study Notes for Tech Interviews</span>
                </div>

                <h1 style={{
                    fontSize: '3.5rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '1.5rem',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em'
                }}>
                    Master Your Tech
                    <br />
                    <span style={{ color: '#F55036' }}>Interview Prep</span>
                </h1>

                <p style={{
                    fontSize: '1.25rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '2.5rem',
                    lineHeight: 1.7,
                    maxWidth: '600px',
                    margin: '0 auto 2.5rem'
                }}>
                    Comprehensive study notes covering DSA, Computer Networking, Operating Systems,
                    and SQL. All code examples in Python with syntax highlighting.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link href="/dsa" className="btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>
                        Start Learning <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>

            {/* Features */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
                padding: '2rem',
                flexWrap: 'wrap',
                borderTop: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
                background: 'var(--sidebar-bg)'
            }}>
                {features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <f.icon className="w-5 h-5" style={{ color: '#F55036' }} />
                        <div>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '14px' }}>{f.title}</div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{f.desc}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Subject Cards */}
            <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '2rem',
                    textAlign: 'center'
                }}>
                    Choose a Subject
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {subjects.map((subject) => (
                        <Link
                            key={subject.href}
                            href={subject.href}
                            className="card"
                            style={{
                                display: 'block',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                cursor: 'pointer'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: subject.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <subject.icon className="w-6 h-6 text-white" style={{ color: 'white' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{
                                        fontSize: '1.125rem',
                                        fontWeight: 600,
                                        color: 'var(--text-primary)',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {subject.title}
                                    </h3>
                                    <p style={{
                                        fontSize: '14px',
                                        color: 'var(--text-secondary)',
                                        margin: 0,
                                        lineHeight: 1.6
                                    }}>
                                        {subject.description}
                                    </p>
                                </div>
                                <ArrowRight className="w-5 h-5" style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
