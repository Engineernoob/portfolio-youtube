"use client";

import { projects, Project } from '../../../data/projects';
import VideoCard from './VideoCard';
import { useSearchParams } from 'next/navigation';

export default function VideoGrid() {
  const searchParams = useSearchParams();
  const q = (searchParams.get('q') || '').toLowerCase();
  const cat = (searchParams.get('cat') || '').toLowerCase();
  const tag = (searchParams.get('tag') || '').toLowerCase();

  const filtered: Project[] = projects.filter((p) => {
    // Text search across several fields
    if (q) {
      const hay = `${p.title} ${p.teaser} ${p.channel} ${p.category} ${p.tags.join(' ')}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    // Category match
    if (cat && p.category.toLowerCase() !== cat) return false;
    // Tag match (single tag filter)
    if (tag && !p.tags.map((t) => t.toLowerCase()).includes(tag)) return false;
    return true;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto p-4">
      {filtered.map((project: Project) => (
        <VideoCard key={project.id} project={project} />
      ))}
    </div>
  );
}
