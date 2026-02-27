import Link from 'next/link';
import {
    Code, Network, Cpu, Database, ArrowRight, BookOpen, Zap, Target,
    GraduationCap, CheckCircle2, FileText, ChevronRight,
    Sparkles, Clock, Shield, TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const siteUrl = "https://studynotes.vercel.app";

const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "StudyNotes — Free CS Interview Prep Notes",
    description: "Free, structured study notes for DSA, Computer Networking, OS, and SQL — built for tech interview preparation.",
    url: siteUrl,
    mainEntity: {
        "@type": "ItemList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Data Structures & Algorithms", url: `${siteUrl}/dsa` },
            { "@type": "ListItem", position: 2, name: "Computer Networking", url: `${siteUrl}/cn` },
            { "@type": "ListItem", position: 3, name: "Operating Systems", url: `${siteUrl}/os` },
            { "@type": "ListItem", position: 4, name: "SQL & Databases", url: `${siteUrl}/sql` },
        ],
    },
};

const subjects = [
    {
        title: 'Data Structures & Algorithms',
        description: 'Master arrays, linked lists, trees, graphs, sorting, dynamic programming, backtracking and 50+ coding patterns.',
        href: '/dsa',
        icon: Code,
        gradient: 'linear-gradient(135deg, hsl(220 90% 50%), hsl(230 85% 42%))',
        shadowColor: 'hsl(220 90% 56% / 0.3)',
        topics: '12 Chapters',
        highlight: 'Most Popular',
    },
    {
        title: 'Computer Networking',
        description: 'OSI & TCP/IP models, HTTP, DNS, routing protocols, network security — everything you need for interviews.',
        href: '/cn',
        icon: Network,
        gradient: 'linear-gradient(135deg, var(--secondary), hsl(220 90% 50%))',
        shadowColor: 'hsl(210 80% 62% / 0.3)',
        topics: '8 Chapters',
        highlight: null,
    },
    {
        title: 'Operating Systems',
        description: 'Process management, memory, deadlocks, file systems, scheduling algorithms — all with clear examples.',
        href: '/os',
        icon: Cpu,
        gradient: 'linear-gradient(135deg, var(--primary), hsl(210 80% 50%))',
        shadowColor: 'hsl(220 90% 56% / 0.3)',
        topics: '10 Chapters',
        highlight: null,
    },
    {
        title: 'SQL & Databases',
        description: 'From basic queries to window functions, CTEs, normalization, indexing — with ready-to-run examples.',
        href: '/sql',
        icon: Database,
        gradient: 'linear-gradient(135deg, hsl(215 80% 48%), hsl(225 75% 40%))',
        shadowColor: 'hsl(215 80% 48% / 0.3)',
        topics: '9 Chapters',
        highlight: null,
    },
];

const stats = [
    { value: '40+', label: 'In-Depth Topics' },
    { value: '200+', label: 'Code Examples' },
    { value: '4', label: 'Core Subjects' },
    { value: '100%', label: 'Free & Open' },
];

const steps = [
    { step: '01', title: 'Pick a Subject', desc: 'Choose from DSA, Computer Networks, Operating Systems, or SQL to begin.', icon: Target },
    { step: '02', title: 'Study the Notes', desc: 'Read concise, interview-focused notes with syntax-highlighted Python code.', icon: BookOpen },
    { step: '03', title: 'Ace Your Interview', desc: 'Apply what you learned. Each topic is designed for real placement questions.', icon: TrendingUp },
];

const benefits = [
    { icon: Zap, title: 'Interview-First Approach', desc: 'Every topic is written with placement interviews in mind — no fluff, just what matters.' },
    { icon: Code, title: 'Python Code Examples', desc: 'All algorithms come with clean, copy-ready Python implementations with syntax highlighting.' },
    { icon: FileText, title: 'Downloadable PDFs', desc: 'Get offline-ready PDF notes for Computer Networks, OS, and SQL to study anywhere.' },
    { icon: Shield, title: 'Structured & Reliable', desc: 'Topics follow a logical order — from fundamentals to advanced concepts, no jumping around.' },
    { icon: Clock, title: 'Save Hours of Prep', desc: 'Stop searching across 10 websites. Everything you need is organized in one place.' },
    { icon: Sparkles, title: 'Always Up to Date', desc: 'Content is regularly updated to match the latest interview trends and patterns.' },
];

const faqs = [
    { q: 'Is StudyNotes completely free?', a: 'Yes — all notes, code examples, and PDF downloads are 100% free. No sign-ups, no paywalls.' },
    { q: 'What subjects are covered?', a: 'We cover four core CS subjects: Data Structures & Algorithms, Computer Networking, Operating Systems, and SQL & Databases.' },
    { q: 'Are the notes good for placements?', a: 'Absolutely. Every topic is written with tech placements and coding interviews in mind, covering the most frequently asked concepts.' },
    { q: 'What programming language are code examples in?', a: 'All code examples are written in Python with proper syntax highlighting for easy reading and understanding.' },
    { q: 'Can I download the notes as PDF?', a: 'Yes. Computer Networks, Operating Systems, and SQL notes are available as downloadable PDFs for offline study.' },
];

export default function Home() {
    return (
        <div className="landing-page">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
            />
            {/* ─── HERO ─── */}
            <section className="hero-section">
                <div className="hero-inner">
                    <div className="animate-fade-in-up">
                        <div className="hero-badge">
                            <span className="hero-badge-dot" />
                            <span>Free &amp; Open Source Study Material</span>
                        </div>
                    </div>

                    <h1 className="hero-title animate-fade-in-up delay-1">
                        Your One-Stop
                        <br />
                        <span className="gradient-text">CS Interview Prep</span>
                    </h1>

                    <p className="hero-description animate-fade-in-up delay-2">
                        Free, structured study notes for <strong>DSA</strong>, <strong>Computer Networks</strong>,{' '}
                        <strong>Operating Systems</strong> &amp; <strong>SQL</strong> — built to help you crack your next
                        tech interview. All code in Python.
                    </p>

                    <div className="hero-cta-row animate-fade-in-up delay-3">
                        <Button asChild size="lg">
                            <Link href="/dsa">
                                Start with DSA <ArrowRight className="w-5 h-5" />
                            </Link>
                        </Button>
                        <Button asChild variant="secondary" size="lg">
                            <Link href="#subjects">
                                Browse All Subjects <ChevronRight className="w-4 h-4" />
                            </Link>
                        </Button>
                    </div>

                    <div className="hero-trust animate-fade-in-up delay-4">
                        <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--success)' }} />
                        <span>No sign-up required</span>
                        <span className="hero-trust-sep">·</span>
                        <span>100% free</span>
                        <span className="hero-trust-sep">·</span>
                        <span>Open source on GitHub</span>
                    </div>
                </div>
            </section>

            {/* ─── STATS BAR ─── */}
            <section className="stats-bar animate-fade-in delay-4">
                {stats.map((s, i) => (
                    <div key={i} className="stat-item">
                        <span className="stat-value">{s.value}</span>
                        <span className="stat-label">{s.label}</span>
                    </div>
                ))}
            </section>

            {/* ─── SUBJECTS ─── */}
            <section id="subjects" className="section">
                <div className="section-header animate-fade-in-up">
                    <Badge>Subjects</Badge>
                    <h2 className="section-title">Everything You Need, In One Place</h2>
                    <p className="section-subtitle">Four core CS subjects — curated, concise, and interview-ready.</p>
                </div>

                <div className="subject-grid">
                    {subjects.map((subject, idx) => (
                        <Link
                            key={subject.href}
                            href={subject.href}
                            className={`subject-card animate-fade-in-up delay-${Math.min(idx + 2, 6)}`}
                        >
                            {subject.highlight && <span className="subject-highlight">{subject.highlight}</span>}
                            <div className="subject-card-top">
                                <div
                                    className="icon-box"
                                    style={{
                                        background: subject.gradient,
                                        boxShadow: `0 4px 15px ${subject.shadowColor}`,
                                    }}
                                >
                                    <subject.icon className="w-6 h-6" style={{ color: 'white' }} />
                                </div>
                                <span className="subject-topics">{subject.topics}</span>
                            </div>
                            <h3 className="subject-card-title">{subject.title}</h3>
                            <p className="subject-card-desc">{subject.description}</p>
                            <span className="subject-card-link">
                                Start Learning <ChevronRight className="w-4 h-4" />
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ─── HOW IT WORKS ─── */}
            <section className="section section-alt">
                <div className="section-header animate-fade-in-up">
                    <Badge>How It Works</Badge>
                    <h2 className="section-title">Three Steps to Interview Confidence</h2>
                    <p className="section-subtitle">No complicated setup. Just open, read, and learn.</p>
                </div>

                <div className="steps-grid">
                    {steps.map((s, i) => (
                        <div key={i} className={`step-card animate-fade-in-up delay-${i + 2}`}>
                            <span className="step-number">{s.step}</span>
                            <div className="step-icon-wrap">
                                <s.icon className="w-6 h-6" />
                            </div>
                            <h3 className="step-title">{s.title}</h3>
                            <p className="step-desc">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── BENEFITS ─── */}
            <section className="section">
                <div className="section-header animate-fade-in-up">
                    <Badge>Why StudyNotes</Badge>
                    <h2 className="section-title">Built for Students Who Mean Business</h2>
                    <p className="section-subtitle">Every feature exists because it helps you prepare faster and smarter.</p>
                </div>

                <div className="benefits-grid">
                    {benefits.map((b, i) => (
                        <div key={i} className={`benefit-card animate-fade-in-up delay-${Math.min(i + 1, 6)}`}>
                            <div className="benefit-icon">
                                <b.icon className="w-5 h-5" />
                            </div>
                            <h3 className="benefit-title">{b.title}</h3>
                            <p className="benefit-desc">{b.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── FAQ ─── */}
            <section className="section section-alt">
                <div className="section-header animate-fade-in-up">
                    <Badge>FAQ</Badge>
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <p className="section-subtitle">Quick answers to things people usually ask.</p>
                </div>

                <Accordion type="single" collapsible className="faq-list">
                    {faqs.map((faq, i) => (
                        <AccordionItem key={i} value={`faq-${i}`} className={`animate-fade-in-up delay-${Math.min(i + 1, 6)}`}>
                            <AccordionTrigger>{faq.q}</AccordionTrigger>
                            <AccordionContent>{faq.a}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>

            {/* ─── FINAL CTA ─── */}
            <section className="cta-banner">
                <div className="cta-inner animate-fade-in-up">
                    <GraduationCap className="w-10 h-10" style={{ color: 'white', opacity: 0.9 }} />
                    <h2 className="cta-title">Ready to Start Preparing?</h2>
                    <p className="cta-desc">
                        Join thousands of students using StudyNotes to crack their tech interviews.
                        Pick a subject and start now — it&apos;s completely free.
                    </p>
                    <div className="cta-buttons">
                        <Button asChild variant="white" size="lg">
                            <Link href="/dsa">
                                Start Learning Now <ArrowRight className="w-5 h-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* ─── FOOTER ─── */}
            <footer className="landing-footer">
                <div className="footer-inner">
                    <div className="footer-brand">
                        <div className="logo-mark"><span>S</span></div>
                        <span className="logo-text">StudyNotes</span>
                    </div>
                    <p className="footer-copy">Free CS interview prep notes. Built with Next.js. Open-sourced on GitHub.</p>
                    <div className="footer-links">
                        <Link href="/dsa">DSA</Link>
                        <Link href="/cn">Networks</Link>
                        <Link href="/os">OS</Link>
                        <Link href="/sql">SQL</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
