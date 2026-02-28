'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Sparkles } from 'lucide-react';

export default function WelcomeToast() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const dismissed = localStorage.getItem('studynotes-welcome');
        if (!dismissed) {
            const timer = setTimeout(() => setVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const dismiss = () => {
        setVisible(false);
        localStorage.setItem('studynotes-welcome', 'true');
    };

    if (!visible) return null;

    return (
        <div className="welcome-toast" role="status" aria-live="polite">
            <Sparkles className="w-4 h-4" style={{ color: 'var(--secondary)', flexShrink: 0 }} />
            <span>
                Welcome! New here?{' '}
                <Link href="/dsa" onClick={dismiss}>Start with DSA &rarr;</Link>
            </span>
            <button onClick={dismiss} aria-label="Dismiss welcome message">
                <X className="w-3.5 h-3.5" />
            </button>
        </div>
    );
}
