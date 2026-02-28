'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Code, Network, Cpu, Database, ArrowRight } from 'lucide-react';

const searchItems = [
    { title: 'Data Structures & Algorithms', href: '/dsa', icon: Code, keywords: ['dsa', 'data structures', 'algorithms'] },
    { title: 'Arrays', href: '/dsa#arrays', icon: Code, keywords: ['arrays', 'list', 'insert', 'remove'] },
    { title: 'Linked Lists', href: '/dsa#linked-lists', icon: Code, keywords: ['linked list', 'node', 'pointer'] },
    { title: 'Sorting Algorithms', href: '/dsa#sorting', icon: Code, keywords: ['sorting', 'merge sort', 'quick sort', 'bubble sort'] },
    { title: 'Binary Search', href: '/dsa#binary-search', icon: Code, keywords: ['binary search', 'divide', 'conquer'] },
    { title: 'Trees', href: '/dsa#trees', icon: Code, keywords: ['trees', 'binary tree', 'bst', 'traversal'] },
    { title: 'Graphs', href: '/dsa#graphs', icon: Code, keywords: ['graphs', 'bfs', 'dfs', 'shortest path', 'dijkstra'] },
    { title: 'Dynamic Programming', href: '/dsa#dynamic-programming', icon: Code, keywords: ['dp', 'dynamic programming', 'memoization'] },
    { title: 'Backtracking', href: '/dsa#backtracking', icon: Code, keywords: ['backtracking', 'recursion', 'n-queens'] },
    { title: 'Heap / Priority Queue', href: '/dsa#heap--priority-queue', icon: Code, keywords: ['heap', 'priority queue', 'min heap', 'max heap'] },
    { title: 'Hashing', href: '/dsa#hashing', icon: Code, keywords: ['hashing', 'hash map', 'hash table'] },
    { title: 'Bit Manipulation', href: '/dsa#bit-manipulation', icon: Code, keywords: ['bit manipulation', 'bitwise', 'xor'] },
    { title: 'Computer Networking', href: '/cn', icon: Network, keywords: ['networking', 'cn', 'osi', 'tcp', 'ip', 'http', 'dns'] },
    { title: 'Operating Systems', href: '/os', icon: Cpu, keywords: ['os', 'operating system', 'processes', 'memory', 'deadlock'] },
    { title: 'SQL & Databases', href: '/sql', icon: Database, keywords: ['sql', 'database', 'queries', 'joins', 'normalization'] },
];

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const filtered = query.trim()
        ? searchItems.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.keywords.some(k => k.includes(query.toLowerCase()))
        )
        : searchItems.slice(0, 6);

    const navigate = useCallback((href: string) => {
        onClose();
        router.push(href);
    }, [onClose, router]);

    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setActiveIndex(0);
            setTimeout(() => inputRef.current?.focus(), 50);
            document.body.style.overflow = 'hidden';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex(i => Math.min(i + 1, filtered.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex(i => Math.max(i - 1, 0));
        } else if (e.key === 'Enter' && filtered[activeIndex]) {
            navigate(filtered[activeIndex].href);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="search-overlay" onClick={onClose}>
            <div className="search-modal" onClick={e => e.stopPropagation()} onKeyDown={handleKeyDown}>
                <div className="search-input-wrap">
                    <Search className="w-5 h-5 search-icon" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search topics..."
                        value={query}
                        onChange={e => { setQuery(e.target.value); setActiveIndex(0); }}
                        className="search-input"
                        aria-label="Search topics"
                    />
                    <kbd className="search-kbd" onClick={onClose}>ESC</kbd>
                </div>
                <div className="search-results">
                    {filtered.length === 0 ? (
                        <div className="search-empty">No results for &ldquo;{query}&rdquo;</div>
                    ) : (
                        filtered.map((item, i) => (
                            <button
                                key={item.href}
                                className={`search-result-item ${i === activeIndex ? 'active' : ''}`}
                                onClick={() => navigate(item.href)}
                                onMouseEnter={() => setActiveIndex(i)}
                            >
                                <item.icon className="w-4 h-4" />
                                <span>{item.title}</span>
                                <ArrowRight className="w-3.5 h-3.5 search-result-arrow" />
                            </button>
                        ))
                    )}
                </div>
                <div className="search-footer">
                    <span>Navigate <kbd>&uarr;</kbd><kbd>&darr;</kbd></span>
                    <span>Open <kbd>&crarr;</kbd></span>
                    <span>Close <kbd>Esc</kbd></span>
                </div>
            </div>
        </div>
    );
}
