'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'DSA', href: '/dsa' },
    { name: 'CN', href: '/cn' },
    { name: 'OS', href: '/os' },
    { name: 'SQL', href: '/sql' },
];

export default function Header() {
    const pathname = usePathname();
    const [isDark, setIsDark] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem('theme');
        if (stored === 'light') {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        } else {
            setIsDark(true);
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        }
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
        if (newIsDark) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        }
    };

    return (
        <header>
            <div className="h-14 px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: '#F55036' }}>
                        <span className="text-white font-bold text-sm">S</span>
                    </div>
                    <span className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
                        StudyNotes
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    <nav className="flex items-center gap-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link key={item.name} href={item.href} className={`nav-pill ${isActive ? 'active' : ''}`}>
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {mounted && (
                        <button
                            onClick={toggleTheme}
                            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-105"
                            style={{
                                background: 'var(--card-bg)',
                                border: '1px solid var(--border)',
                                color: 'var(--text-secondary)'
                            }}
                            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
