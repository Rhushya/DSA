'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'DSA', href: '/dsa' },
    { name: 'CN', href: '/cn' },
    { name: 'OS', href: '/os' },
    { name: 'SQL', href: '/sql' },
] as const;

export default function Header() {
    const pathname = usePathname();
    const [isDark, setIsDark] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

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
        <TooltipProvider delayDuration={300}>
            <header>
                <div className="h-16 px-6 flex items-center justify-between max-w-[1600px] mx-auto">
                    {/* Left: Logo + Mobile Sheet Trigger */}
                    <div className="flex items-center gap-3">
                        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="mobile-menu-toggle"
                                    aria-label="Open navigation menu"
                                >
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left">
                                <nav className="flex flex-col gap-1 p-4 pt-12">
                                    {navItems.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                onClick={() => setMobileOpen(false)}
                                                className={`nav-pill ${isActive ? 'active' : ''}`}
                                                style={{ padding: '0.625rem 1rem' }}
                                            >
                                                <span className="relative z-[1]">{item.name}</span>
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </SheetContent>
                        </Sheet>

                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="logo-mark" aria-hidden="true">
                                <span>S</span>
                            </div>
                            <span className="logo-text">StudyNotes</span>
                        </Link>
                    </div>

                    {/* Center: Navigation */}
                    <nav className="desktop-nav flex items-center gap-1" aria-label="Main navigation">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`nav-pill ${isActive ? 'active' : ''}`}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    <span className="relative z-[1]">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right: Theme Toggle */}
                    <div className="flex items-center gap-3">
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
            </header>
        </TooltipProvider>
    );
}
