'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Menu, X } from 'lucide-react';
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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <div className="h-16 px-6 flex items-center justify-between max-w-[1600px] mx-auto">
                {/* Left: Logo + Mobile Menu */}
                <div className="flex items-center gap-3">
                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>

                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="logo-mark">
                            <span>S</span>
                        </div>
                        <span className="logo-text">StudyNotes</span>
                    </Link>
                </div>

                {/* Center: Navigation */}
                <nav className="desktop-nav flex items-center gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`nav-pill ${isActive ? 'active' : ''}`}
                            >
                                <span style={{ position: 'relative', zIndex: 1 }}>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Right: Theme Toggle */}
                <div className="flex items-center gap-3">
                    {mounted && (
                        <button
                            onClick={toggleTheme}
                            className="theme-toggle"
                            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            {mobileMenuOpen && (
                <div
                    className="absolute top-full left-0 right-0 border-b animate-fade-in"
                    style={{
                        background: 'var(--glass-bg)',
                        backdropFilter: 'var(--glass-blur)',
                        WebkitBackdropFilter: 'var(--glass-blur)',
                        borderColor: 'var(--border)',
                        zIndex: 99,
                    }}
                >
                    <nav className="flex flex-col p-4 gap-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`nav-pill ${isActive ? 'active' : ''}`}
                                    style={{ padding: '0.625rem 1rem' }}
                                >
                                    <span style={{ position: 'relative', zIndex: 1 }}>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            )}
        </header>
    );
}
