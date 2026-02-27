'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PanelLeftOpen } from 'lucide-react';

interface SidebarSection {
    title: string;
    links: { id: string; title: string; href?: string }[];
}

const sections: SidebarSection[] = [
    {
        title: 'Getting Started',
        links: [{ id: 'introduction', title: 'Overview' }],
    },
    {
        title: 'Data Structures',
        links: [
            { id: 'arrays', title: 'Arrays' },
            { id: 'linked-lists', title: 'Linked Lists' },
            { id: 'trees', title: 'Trees' },
            { id: 'heap--priority-queue', title: 'Heap / Priority Queue' },
            { id: 'hashing', title: 'Hashing' },
            { id: 'graphs', title: 'Graphs' },
        ],
    },
    {
        title: 'Algorithms',
        links: [
            { id: 'sorting', title: 'Sorting' },
            { id: 'binary-search', title: 'Binary Search' },
            { id: 'backtracking', title: 'Backtracking' },
            { id: 'dynamic-programming', title: 'Dynamic Programming' },
            { id: 'bit-manipulation', title: 'Bit Manipulation' },
        ],
    },
    {
        title: 'Advanced Topics',
        links: [
            { id: 'advance-dsa', title: 'Advanced DSA' },
        ],
    },
    {
        title: 'Other Subjects',
        links: [
            { id: 'cn', title: 'Computer Networking', href: '/cn' },
            { id: 'os', title: 'Operating Systems', href: '/os' },
            { id: 'sql', title: 'SQL & Databases', href: '/sql' },
        ],
    },
];

export default function LeftSidebar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const closeSidebar = useCallback(() => setOpen(false), []);

    // Close sidebar on route change
    useEffect(() => {
        closeSidebar();
    }, [pathname, closeSidebar]);

    // Lock body scroll when sidebar is open on mobile
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        if (pathname !== '/dsa') return;
        e.preventDefault();
        closeSidebar();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.history.pushState(null, '', `#${id}`);
        }
    };

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                className="sidebar-mobile-toggle"
                onClick={() => setOpen(true)}
                aria-label="Open navigation sidebar"
            >
                <PanelLeftOpen className="w-5 h-5" />
            </button>

            {/* Overlay */}
            {open && (
                <div
                    className={`sidebar-overlay ${open ? 'visible' : ''}`}
                    onClick={closeSidebar}
                />
            )}

            <aside className={`left-sidebar ${open ? 'open' : ''}`}>
                {sections.map((section) => (
                    <div key={section.title} className="sidebar-section">
                        <div className="sidebar-section-title">{section.title}</div>
                        {section.links.map((link) =>
                            link.href ? (
                                <Link key={link.id} href={link.href} className={`sidebar-link ${pathname === link.href ? 'active' : ''}`}>
                                    {link.title}
                                </Link>
                            ) : (
                                <a key={link.id} href={`#${link.id}`} onClick={(e) => handleClick(e, link.id)} className="sidebar-link">
                                    {link.title}
                                </a>
                            )
                        )}
                    </div>
                ))}
            </aside>
        </>
    );
}
