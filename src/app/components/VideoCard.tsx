'use client';

import { useState, useEffect } from 'react';
import { Project } from '../../../data/projects';
import Image from 'next/image';
import Link from 'next/link';
import Modal from './Modal';

interface VideoCardProps {
  project: Project;
}

export default function VideoCard({ project }: VideoCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likes, setLikes] = useState(project.likes);
  const [dislikes, setDislikes] = useState(project.dislikes);

  // Persist likes/dislikes in localStorage
  useEffect(() => {
    const storedLikes = localStorage.getItem(`likes-${project.id}`);
    const storedDislikes = localStorage.getItem(`dislikes-${project.id}`);
    if (storedLikes) setLikes(parseInt(storedLikes, 10));
    if (storedDislikes) setDislikes(parseInt(storedDislikes, 10));
  }, [project.id]);

  const handleLike = (id: string) => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(`likes-${id}`, newLikes.toString());
  };

  const handleDislike = (id: string) => {
    const newDislikes = dislikes + 1;
    setDislikes(newDislikes);
    localStorage.setItem(`dislikes-${id}`, newDislikes.toString());
  };

  const likeRatio = ((likes / (likes + dislikes)) * 100).toFixed(1);

  return (
    <>
      <div className="group relative bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-[0_0_20px_var(--neon-purple)] transition-all duration-300 w-full max-w-sm">
        <div className="relative">
          <Image
            src={project.thumbnail}
            alt={project.title}
            width={320}
            height={180}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            priority={false}
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
          <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm font-mono">
            {project.duration}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 hover:bg-black/70"
          >
            <span className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-neon-purple font-bold text-lg shadow-lg">
              ▶
            </span>
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-foreground line-clamp-2 mb-1 leading-tight">{project.title}</h3>
          <p className="text-sm text-gray-400 line-clamp-2 mb-2 leading-relaxed">{project.teaser}</p>
          <div className="mb-2 flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((t) => (
              <Link
                key={t}
                href={`/?tag=${encodeURIComponent(t)}`}
                className="text-[10px] px-2 py-0.5 rounded-full bg-gray-800 text-gray-300 hover:bg-neon-purple hover:text-black transition-colors"
              >
                #{t}
              </Link>
            ))}
          </div>
          <div className="flex items-center text-xs text-gray-500 mb-2 space-x-2">
            <span className="font-mono">{project.channel}</span>
            <span>•</span>
            <span>{project.views.toLocaleString()} views</span>
            <span>•</span>
            <span>{likeRatio}% likes</span>
          </div>
          <Link
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-neon-blue hover:text-neon-orange text-xs font-medium transition-colors duration-200"
          >
            View Repo →
          </Link>
        </div>
      </div>
      <Modal
        project={{...project, likes, dislikes}}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLike={handleLike}
        onDislike={handleDislike}
      />
    </>
  );
}
