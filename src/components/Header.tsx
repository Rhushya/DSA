'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Menu, Search, Code, Network, Cpu, Database, Home, X } from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import SearchModal from '@/components/SearchModal';

const navItems = [
    { name: 'Home', href: '/', icon: Home, color: 'var(--primary)' },
    { name: 'DSA', href: '/dsa', icon: Code, color: 'var(--dsa-color)' },
    { name: 'CN', href: '/cn', icon: Network, color: 'var(--cn-color)' },
    { name: 'OS', href: '/os', icon: Cpu, color: 'var(--os-color)' },
    { name: 'SQL', href: '/sql', icon: Database, color: 'var(--sql-color)' },
] as const;

export default function Header() {
    const pathname = usePathname();
    const [isDark, setIsDark] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [readingProgress, setReadingProgress] = useState(0);
    const mobileNavRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            // Reading progress
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight > 0) {
                setReadingProgress(Math.min((window.scrollY / docHeight) * 100, 100));
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setSearchOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Close mobile nav on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    // Lock body scroll when mobile nav is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const toggleTheme = useCallback(() => {
        document.documentElement.classList.add('theme-transitioning');
        setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 400);
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
    }, [isDark]);

    // Get active nav color for accent
    const activeColor = navItems.find(i => i.href === pathname)?.color || 'var(--primary)';

    return (
        <TooltipProvider delayDuration={300}>
            <header className={scrolled ? 'scrolled' : ''}>
                <div className="header-inner">
                    {/* Left: Logo */}
                    <div className="flex items-center gap-3">
                        <button
                            className="mobile-menu-toggle"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle navigation menu"
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>

                        <Link href="/" className="logo-link">
                            <div className="logo-mark" aria-hidden="true">
                                <span>S</span>
                            </div>
                            <span className="logo-text">StudyNotes</span>
                        </Link>
                    </div>

                    {/* Center: Navigation */}
                    <nav className="desktop-nav" aria-label="Main navigation">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`nav-pill ${isActive ? 'active' : ''}`}
                                    aria-current={isActive ? 'page' : undefined}
                                    style={isActive ? { '--nav-accent': item.color } as React.CSSProperties : undefined}
                                >
                                    <item.icon className="nav-pill-icon" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right: Search + Theme Toggle */}
                    <div className="header-actions">
                        <button
                            className="search-trigger"
                            onClick={() => setSearchOpen(true)}
                            aria-label="Search topics"
                        >
                            <Search className="w-4 h-4" />
                            <span className="search-trigger-text">Search...</span>
                            <kbd className="search-trigger-kbd">Ctrl K</kbd>
                        </button>

                        {mounted && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={toggleTheme}
                                        className="theme-toggle"
                                        aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                                    >
                                        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {isDark ? 'Light mode' : 'Dark mode'}
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </div>
                </div>

                {/* Reading Progress Bar */}
                {pathname !== '/' && readingProgress > 0 && (
                    <div className="reading-progress-bar" style={{ '--progress': `${readingProgress}%`, '--bar-color': activeColor } as React.CSSProperties} />
                )}
            </header>

            {/* Mobile Navigation Drawer */}
            {mobileOpen && (
                <div className="mobile-nav-overlay" onClick={() => setMobileOpen(false)} />
            )}
            <div ref={mobileNavRef} className={`mobile-nav-drawer ${mobileOpen ? 'open' : ''}`}>
                <div className="mobile-nav-header">
                    <span className="mobile-nav-title">Navigation</span>
                </div>
                <nav className="mobile-nav-list">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                                onClick={() => setMobileOpen(false)}
                            >
                                <div className="mobile-nav-icon" style={{ background: item.color }}>
                                    <item.icon className="w-5 h-5" style={{ color: 'white' }} />
                                </div>
                                <div className="mobile-nav-info">
                                    <span className="mobile-nav-name">{item.name}</span>
                                    <span className="mobile-nav-desc">
                                        {item.name === 'Home' && 'Overview & getting started'}
                                        {item.name === 'DSA' && 'Arrays, Trees, Graphs, DP'}
                                        {item.name === 'CN' && 'OSI, TCP/IP, Protocols'}
                                        {item.name === 'OS' && 'Processes, Memory, Deadlocks'}
                                        {item.name === 'SQL' && 'Queries, Joins, Window Fns'}
                                    </span>
                                </div>
                                {isActive && <div className="mobile-nav-active-dot" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mobile-nav-footer">
                    <button className="mobile-search-btn" onClick={() => { setMobileOpen(false); setSearchOpen(true); }}>
                        <Search className="w-4 h-4" />
                        <span>Search topics...</span>
                    </button>
                </div>
            </div>

            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </TooltipProvider>
    );
}
