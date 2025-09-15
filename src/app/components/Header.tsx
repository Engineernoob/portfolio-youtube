'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  // Sync input with current URL query for a consistent UX
  useEffect(() => {
    const current = searchParams.get('q') || '';
    setSearchQuery(current);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      router.push(`/?q=${encodeURIComponent(q)}`);
    } else {
      router.push(`/`);
    }
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'ML Projects', href: '/ml' }, // Placeholder for future pages
    { label: 'Backend APIs', href: '/backend' },
    { label: 'Full-Stack', href: '/fullstack' },
    { label: 'Subscriptions', href: '/subscriptions' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-neon-purple font-bold text-xl">
            <span>Taahirah Denmark</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-grow max-w-md mx-4 hidden md:flex">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects... (⌘/Ctrl+K)"
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-l-full text-foreground placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-neon-blue text-background rounded-r-full hover:bg-neon-orange transition-colors duration-200 font-mono"
              >
                Search
              </button>
            </div>
          </form>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-neon-purple transition-colors duration-200 font-mono text-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Icon / Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button className="md:hidden text-foreground hover:text-neon-purple">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <div className="w-8 h-8 bg-neon-purple rounded-full flex items-center justify-center text-background font-mono">
              TD
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-4">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="flex-grow px-4 py-2 bg-gray-900 border border-gray-700 rounded-l-full text-foreground placeholder-gray-400 focus:outline-none focus:border-neon-blue"
          />
          <button
            type="submit"
            className="px-6 bg-neon-blue text-background rounded-r-full hover:bg-neon-orange transition-colors duration-200 font-mono"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
