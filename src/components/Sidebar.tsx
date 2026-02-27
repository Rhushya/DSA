'use client';

import { useEffect, useState } from 'react';

interface Section {
    id: string;
    title: string;
}

interface SidebarProps {
    sections: Section[];
}

export default function Sidebar({ sections }: SidebarProps) {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-100px 0px -70% 0px',
                threshold: 0,
            }
        );

        // Observe all sections
        sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [sections]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveId(id);
            // Update URL hash without scrolling
            window.history.pushState(null, '', `#${id}`);
        }
    };

    return (
        <aside className="right-sidebar">
            <div className="right-sidebar-title">Contents</div>
            <nav>
                {sections.map((section) => {
                    // Check if it's a separator
                    if (section.title.startsWith('---')) {
                        return (
                            <div
                                key={section.id}
                                style={{
                                    margin: '1rem 0 0.5rem',
                                    padding: '0.4rem 0.75rem',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.06em',
                                    background: 'var(--gradient-primary)',
                                    color: 'white',
                                }}
                            >
                                {section.title.replace(/---/g, '').trim()}
                            </div>
                        );
                    }

                    return (
                        <a
                            key={section.id}
                            href={`#${section.id}`}
                            onClick={(e) => handleClick(e, section.id)}
                            className={`sidebar-link ${activeId === section.id ? 'active' : ''}`}
                        >
                            {section.title}
                        </a>
                    );
                })}
            </nav>
        </aside>
    );
}
