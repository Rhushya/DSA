'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        if (pathname !== '/dsa') return;
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.history.pushState(null, '', `#${id}`);
        }
    };

    return (
        <aside className="left-sidebar">
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
    );
}
