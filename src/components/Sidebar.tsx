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
        <aside className="sidebar">
            <div className="mb-4 pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
                <h3 className="font-bold text-sm uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    Contents
                </h3>
            </div>
            <nav>
                {sections.map((section) => {
                    // Check if it's a separator
                    if (section.title.startsWith('---')) {
                        return (
                            <div
                                key={section.id}
                                className="my-4 py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider"
                                style={{
                                    background: 'linear-gradient(135deg, var(--primary), var(--yellow-orange))',
                                    color: 'white'
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
