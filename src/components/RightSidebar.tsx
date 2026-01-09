'use client';

import { useEffect, useState } from 'react';

interface TocItem {
    id: string;
    title: string;
}

interface RightSidebarProps {
    items: TocItem[];
}

export default function RightSidebar({ items }: RightSidebarProps) {
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
            { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
        );

        items.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [items]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveId(id);
        }
    };

    return (
        <aside className="right-sidebar">
            <div className="right-sidebar-title">On this page</div>
            <nav>
                {items.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => handleClick(e, item.id)}
                        className={`toc-link ${activeId === item.id ? 'active' : ''}`}
                    >
                        {item.title}
                    </a>
                ))}
            </nav>
        </aside>
    );
}
