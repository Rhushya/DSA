import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/" aria-label="Home">
                <Home className="w-3.5 h-3.5" />
            </Link>
            {items.map((item, i) => (
                <span key={i} className="flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3 separator" />
                    {item.href ? (
                        <Link href={item.href}>{item.label}</Link>
                    ) : (
                        <span className="current">{item.label}</span>
                    )}
                </span>
            ))}
        </nav>
    );
}
