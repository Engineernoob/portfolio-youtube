'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { projects, Project } from '../../../data/projects';

export default function CommandPalette() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const meta = isMac ? e.metaKey : e.ctrlKey;
      if (meta && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!open) {
      // Prefill with current q when opening next time
      const current = searchParams.get('q') || '';
      setQuery(current);
      setActive(0);
    } else {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open, searchParams]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects.slice(0, 8);
    return projects
      .filter((p) => {
        const hay = `${p.title} ${p.teaser} ${p.channel} ${p.category} ${p.tags.join(' ')}`.toLowerCase();
        return hay.includes(q);
      })
      .slice(0, 8);
  }, [query]);

  const go = (target?: Project) => {
    const q = (target ? target.title : query).trim();
    setOpen(false);
    if (q) router.push(`/?q=${encodeURIComponent(q)}`);
    else router.push('/');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div
        className="mx-auto mt-24 w-full max-w-xl rounded-xl border border-gray-800 bg-gray-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-3 py-2 border-b border-gray-800">
          <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, Math.max(0, results.length - 1)));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === 'Enter') {
                e.preventDefault();
                go(results[active]);
              }
            }}
            placeholder="Search projects, tags…"
            className="ml-2 w-full bg-transparent outline-none text-sm text-foreground placeholder-gray-500"
          />
          <span className="ml-2 rounded bg-gray-800 px-2 py-0.5 text-[10px] text-gray-300 select-none font-mono">Esc</span>
        </div>
        <ul className="max-h-80 overflow-y-auto py-2">
          {results.length === 0 && (
            <li className="px-4 py-3 text-sm text-gray-500">No matches. Press Enter to search.</li>
          )}
          {results.map((p, i) => (
            <li
              key={p.id}
              onMouseEnter={() => setActive(i)}
              onClick={() => go(p)}
              className={`px-4 py-2 cursor-pointer ${
                i === active ? 'bg-gray-800/60 text-neon-blue' : 'text-foreground'
              }`}
            >
              <div className="text-sm font-medium">{p.title}</div>
              <div className="text-xs text-gray-400 line-clamp-1">{p.teaser}</div>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-800 text-[11px] text-gray-500">
          <span>Tip: Press Enter to search for your query</span>
          <span className="hidden sm:flex items-center gap-1">
            <kbd className="rounded bg-gray-800 px-1">⌘/Ctrl</kbd>
            +
            <kbd className="rounded bg-gray-800 px-1">K</kbd>
          </span>
        </div>
      </div>
    </div>
  );
}

