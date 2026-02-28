'use client';

import { useState, useEffect, useRef } from 'react';
import { List, X, ChevronRight } from 'lucide-react';

interface TocItem {
    id: string;
    title: string;
}

interface QuickNavProps {
    items: TocItem[];
}

export default function QuickNav({ items }: QuickNavProps) {
    const [open, setOpen] = useState(false);
    const [activeId, setActiveId] = useState('');
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
        );

        items.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [items]);

    useEffect(() => {
        if (!open) return;
        const handleClick = (e: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [open]);

    const navigateTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveId(id);
            window.history.replaceState(null, '', `#${id}`);
        }
        setOpen(false);
    };

    const activeIndex = items.findIndex(i => i.id === activeId);
    const progress = items.length > 1 ? Math.round(((activeIndex + 1) / items.length) * 100) : 0;

    return (
        <div ref={panelRef} className="quick-nav-container">
            {/* Toggle Button */}
            <button
                className={`quick-nav-toggle ${open ? 'open' : ''}`}
                onClick={() => setOpen(!open)}
                aria-label="Quick navigation"
            >
                {open ? <X className="w-5 h-5" /> : <List className="w-5 h-5" />}
                {!open && progress > 0 && (
                    <svg className="quick-nav-progress-ring" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" stroke="var(--border)" strokeWidth="2" />
                        <circle
                            cx="18" cy="18" r="16" fill="none"
                            stroke="var(--primary)"
                            strokeWidth="2"
                            strokeDasharray={`${progress} 100`}
                            strokeLinecap="round"
                            transform="rotate(-90 18 18)"
                        />
                    </svg>
                )}
            </button>

            {/* Panel */}
            {open && (
                <div className="quick-nav-panel">
                    <div className="quick-nav-header">
                        <span className="quick-nav-label">On this page</span>
                        <span className="quick-nav-count">{activeIndex + 1}/{items.length}</span>
                    </div>
                    <nav className="quick-nav-list">
                        {items.map((item) => (
                            <button
                                key={item.id}
                                className={`quick-nav-item ${activeId === item.id ? 'active' : ''}`}
                                onClick={() => navigateTo(item.id)}
                            >
                                <span>{item.title}</span>
                                <ChevronRight className="w-3.5 h-3.5 quick-nav-arrow" />
                            </button>
                        ))}
                    </nav>
                </div>
            )}
        </div>
    );
}
