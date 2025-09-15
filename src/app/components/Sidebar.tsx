import { projects, Project } from '../../../data/projects';
import Image from 'next/image';
import Link from 'next/link';

export default function Sidebar() {
  // Group projects by category for recommendations
  const groupedProjects: Record<string, Project[]> = projects.reduce((acc, project) => {
    if (!acc[project.category]) acc[project.category] = [];
    acc[project.category].push(project);
    return acc;
  }, {} as Record<string, Project[]>);

  return (
    <aside className="hidden lg:block w-80 bg-gray-900/50 border-l border-gray-800 p-4 overflow-y-auto h-[calc(100vh-4rem)] sticky top-16">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-neon-purple font-mono">Recommended Projects</h2>
        <Link href="/" className="text-xs text-gray-400 hover:text-neon-blue font-mono">Clear</Link>
      </div>
      {Object.entries(groupedProjects).map(([category, projects]) => (
        <div key={category} className="mb-6">
          <Link href={`/?cat=${category}`} className="block text-md font-semibold text-foreground mb-2 capitalize font-mono border-b border-gray-700 pb-1 hover:text-neon-blue">
            {category} Projects
          </Link>
          <div className="space-y-4">
            {projects.slice(0, 3).map((project) => (
              <div key={project.id} className="group flex items-start space-x-3 hover:bg-gray-800/50 p-2 rounded transition-colors duration-200">
                <div className="relative w-24 h-14 flex-shrink-0 rounded overflow-hidden">
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
                  <div className="mt-1 flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((t) => (
                      <Link key={t} href={`/?tag=${encodeURIComponent(t)}`} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-300 hover:bg-neon-purple hover:text-black">
                        #{t}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
