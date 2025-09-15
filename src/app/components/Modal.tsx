'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../../../data/projects';

interface ModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
}

export default function Modal({ project, isOpen, onClose, onLike, onDislike }: ModalProps) {
  if (!project) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-end md:items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-gray-700"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground truncate">{project.title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-foreground transition-colors duration-200"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Preview Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-neon-purple mb-2">Project Preview</h3>
                {project.preview.type === 'iframe' && (
                  <div className="relative w-full h-64 md:h-96 bg-gray-800 rounded-lg overflow-hidden">
                    <iframe 
                      src={project.preview.content} 
                      title={project.title} 
                      className="w-full h-full border-0"
                      allowFullScreen
                    />
                  </div>
                )}
                {project.preview.type === 'code' && (
                  <pre className="bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto font-mono text-foreground border border-gray-700">
                    <code>{project.preview.content}</code>
                  </pre>
                )}
                {project.preview.type === 'image' && (
                  <div className="relative w-full h-64 md:h-96 bg-gray-800 rounded-lg overflow-hidden">
                    <img 
                      src={project.preview.content} 
                      alt={project.title} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="mb-6">
                <p className="text-foreground mb-2">{project.teaser}</p>
                <div className="flex items-center text-sm text-gray-400 space-x-4">
                  <span>{project.views.toLocaleString()} views</span>
                  <span>{project.likes} likes</span>
                  <span>{project.dislikes} dislikes</span>
                  <a 
                    href={project.repoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-neon-blue hover:text-neon-orange transition-colors duration-200"
                  >
                    View Repo
                  </a>
                </div>
              </div>

              {/* Like/Dislike Buttons */}
              <div className="flex items-center space-x-4 mb-6">
                <button
                  onClick={() => onLike(project.id)}
                  className="flex items-center space-x-1 text-foreground hover:text-neon-blue transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{project.likes}</span>
                </button>
                <button
                  onClick={() => onDislike(project.id)}
                  className="flex items-center space-x-1 text-foreground hover:text-neon-orange transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{project.dislikes}</span>
                </button>
              </div>

              {/* Comments Section */}
              <div>
                <h3 className="text-lg font-semibold text-neon-purple mb-2">Comments ({project.comments.length})</h3>
                <div className="space-y-4">
                  {project.comments.map((comment, index) => (
                    <div key={index} className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                      <div className="flex items-center mb-1">
                        <div className="w-6 h-6 bg-neon-purple rounded-full flex items-center justify-center text-xs text-background font-mono mr-2">
                          {comment.author.charAt(0)}
                        </div>
                        <span className="font-medium text-foreground">{comment.author}</span>
                      </div>
                      <p className="text-foreground text-sm">{comment.text}</p>
                    </div>
                  ))}
                </div>
                <form className="mt-4">
                  <textarea
                    placeholder="Add a comment..."
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-foreground placeholder-gray-400 focus:outline-none focus:border-neon-blue resize-none"
                    rows={3}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-neon-blue text-background rounded-lg hover:bg-neon-orange transition-colors duration-200 font-mono text-sm"
                    >
                      Comment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}