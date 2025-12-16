/**
 * PlayOra Blog Modal Component
 * Full-screen modal for reading blog posts
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Calendar, User, Tag, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { BlogPost } from '../models/types';
import { formatDate, getReadingTime } from '../utils/helpers';
import { parseMarkdown } from '../utils/markdown';

interface BlogModalProps {
  blog: BlogPost;
  isOpen: boolean;
  onClose: () => void;
}

export default function BlogModal({ blog, isOpen, onClose }: BlogModalProps) {
  const [parsedContent, setParsedContent] = useState('');

  useEffect(() => {
    if (blog && isOpen) {
      parseMarkdown(blog.content).then(setParsedContent);
    }
  }, [blog, isOpen]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: `${window.location.origin}/#blog/${blog.slug}`,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying to clipboard
      const url = `${window.location.origin}/#blog/${blog.slug}`;
      await navigator.clipboard.writeText(url);
    }
  };

  if (!blog) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full h-full max-w-4xl mx-auto bg-background shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-background-secondary">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-background"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className="text-xl font-bold text-text-primary line-clamp-1">
                    {blog.title}
                  </h1>
                  <p className="text-sm text-text-secondary">PlayOra Blog</p>
                </div>
              </div>
              
              <Button
                onClick={handleShare}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Cover Image */}
              {blog.cover && (
                <div className="relative h-64 lg:h-80">
                  <img
                    src={blog.cover}
                    alt={`Cover image for ${blog.title}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              )}

              {/* Article Content */}
              <article className="p-6 lg:p-8 max-w-3xl mx-auto">
                {/* Title */}
                <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6 leading-tight">
                  {blog.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-border">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <User className="w-4 h-4" />
                    <span>{blog.author.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(blog.date)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Clock className="w-4 h-4" />
                    <span>{getReadingTime(blog.content)} min read</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Excerpt */}
                <div className="text-lg text-text-secondary mb-8 p-4 bg-background-secondary rounded-lg border-l-4 border-primary">
                  {blog.excerpt}
                </div>

                {/* Blog Content */}
                <div 
                  className="prose prose-lg max-w-none text-text-primary prose-headings:text-text-primary prose-a:text-primary prose-strong:text-text-primary prose-code:text-primary prose-blockquote:text-text-secondary prose-blockquote:border-l-primary"
                  dangerouslySetInnerHTML={{ __html: parsedContent }}
                />

                {/* Author Bio */}
                <div className="mt-12 p-6 bg-background-secondary rounded-lg border border-border">
                  <div className="flex items-center gap-4">
                    {blog.author.avatar && (
                      <img
                        src={blog.author.avatar}
                        alt={`${blog.author.name} avatar`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <h3 className="font-bold text-text-primary">
                        {blog.author.name}
                      </h3>
                      <p className="text-text-secondary">
                        PlayOra Team Member
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            {/* Footer */}
            <div className="border-t border-border p-6 bg-background-secondary">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-text-secondary text-sm">
                  Enjoyed this article? Share it with your sports community!
                </p>
                
                <div className="flex items-center gap-3">
                  <Button
                    onClick={handleShare}
                    className="bg-primary hover:bg-primary-dark text-textLight px-6 py-2 rounded-full transition-all duration-200"
                  >
                    Share Article
                  </Button>
                  
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="px-6 py-2 rounded-full"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}