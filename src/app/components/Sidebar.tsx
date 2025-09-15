"use client";

import { projects, Project } from '../../../data/projects';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const q = (searchParams.get('q') || '').toLowerCase();
  const cat = (searchParams.get('cat') || '').toLowerCase();
  const tag = (searchParams.get('tag') || '').toLowerCase();
  const sort = searchParams.get('sort') || '';

  const allTags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort().slice(0, 15);
  }, []);

  const filteredByQuery = useMemo(() => {
    return projects.filter((p) => {
      if (!q) return true;
      const hay = `${p.title} ${p.teaser} ${p.channel} ${p.category} ${p.tags.join(' ')}`.toLowerCase();
      return hay.includes(q);
    });
  }, [q]);

  const counts = useMemo(() => {
    const catCounts: Record<string, number> = { ml: 0, backend: 0, fullstack: 0 };
    const tagCounts: Record<string, number> = {};
    filteredByQuery.forEach((p) => {
      // Respect current tag when counting categories
      if (!tag || p.tags.map((t) => t.toLowerCase()).includes(tag)) {
        catCounts[p.category] = (catCounts[p.category] || 0) + 1;
      }
      // Respect current category when counting tags
      if (!cat || p.category.toLowerCase() === cat) {
        p.tags.forEach((t) => {
          const key = t.toLowerCase();
          tagCounts[key] = (tagCounts[key] || 0) + 1;
        });
      }
    });
    return { catCounts, tagCounts };
  }, [filteredByQuery, tag, cat]);

  const setParam = (key: string, value: string | null) => {
    const sp = new URLSearchParams(searchParams.toString());
    if (value && value.length) sp.set(key, value);
    else sp.delete(key);
    router.push(`${pathname}?${sp.toString()}`);
  };

  return (
    <aside className="hidden lg:block w-80 bg-gray-900/50 border-l border-gray-800 p-4 overflow-y-auto h-[calc(100vh-4rem)] sticky top-16">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-neon-purple font-mono">Filters</h2>
        <button onClick={() => router.push(pathname)} className="text-xs text-gray-400 hover:text-neon-blue font-mono">Clear</button>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-2 font-mono">Category</h3>
        <div className="flex flex-wrap gap-2">
          {(['ml','backend','fullstack'] as const).map((c) => (
            <button
              key={c}
              onClick={() => setParam('cat', cat === c ? null : c)}
              className={`px-2 py-1 rounded-full text-xs border ${
                cat === c ? 'bg-neon-purple text-black border-neon-purple' : 'bg-gray-900 text-gray-300 border-gray-700 hover:border-neon-purple'
              }`}
            >
              {c} <span className="ml-1 text-[10px] text-gray-400">{counts.catCounts[c]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-2 font-mono">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map((t) => {
            const tLower = t.toLowerCase();
            const count = counts.tagCounts[tLower] || 0;
            if (count === 0) return null;
            return (
              <button
                key={t}
                onClick={() => setParam('tag', tag === tLower ? null : tLower)}
                className={`px-2 py-1 rounded-full text-[11px] border ${
                  tag === tLower ? 'bg-neon-purple text-black border-neon-purple' : 'bg-gray-900 text-gray-300 border-gray-700 hover:border-neon-purple'
                }`}
                title={`#${t} (${count})`}
              >
                #{t} <span className="ml-1 text-[10px] text-gray-400">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-2 font-mono">Sort</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { key: '', label: 'Default' },
            { key: 'views', label: 'Most viewed' },
            { key: 'likes', label: 'Most liked' },
          ].map((s) => (
            <button
              key={s.key}
              onClick={() => setParam('sort', s.key || null)}
              className={`px-2 py-1 rounded-full text-xs border ${
                sort === s.key ? 'bg-neon-purple text-black border-neon-purple' : 'bg-gray-900 text-gray-300 border-gray-700 hover:border-neon-purple'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold text-foreground mb-2 font-mono">Recommended</h3>
        <div className="space-y-4">
          {projects.slice(0, 3).map((project) => (
            <div key={project.id} className="group flex items-start space-x-3 hover:bg-gray-800/50 p-2 rounded transition-colors duration-200">
              <div className="relative w-24 aspect-video flex-shrink-0 rounded overflow-hidden">
                <Image 
                  src={project.thumbnail} 
                  alt={project.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground truncate group-hover:text-neon-blue transition-colors duration-200">
                  {project.title}
                </h4>
                <p className="text-xs text-gray-400 truncate">{project.channel}</p>
                <p className="text-xs text-gray-500">{project.views.toLocaleString()} views</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
