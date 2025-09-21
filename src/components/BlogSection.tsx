/**
 * PlayOra Blog Section
 * Showcases recent blog posts with search and filtering
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Tag, Clock, ArrowRight, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { blogService } from '../services/blogService';
import { BlogPost as SupabaseBlogPost } from '../lib/supabaseClient';
import { BlogPost } from '../models/types';
import { formatDate, getReadingTime, truncateText, debounce } from '../utils/helpers';
import { useModal } from '../hooks/useModal';
import BlogModal from './BlogModal';
import { supabase } from '../lib/supabaseClient';

// Helper function to convert Supabase BlogPost to existing BlogPost interface
const convertSupabaseToBlogPost = (supabasePost: SupabaseBlogPost): BlogPost => {
  return {
    id: supabasePost.id.toString(),
    slug: supabasePost.slug,
    title: supabasePost.title,
    excerpt: supabasePost.excerpt || '',
    content: supabasePost.content,
    date: supabasePost.date,
    author: {
      name: supabasePost.author_name,
      avatar: supabasePost.author_avatar || ''
    },
    tags: Array.isArray(supabasePost.tags) ? supabasePost.tags : [],
    cover: supabasePost.cover_image || ''
  };
};

export default function BlogSection() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  
  const { isOpen: isBlogModalOpen, openModal: openBlogModal, closeModal: closeBlogModal } = useModal();

  // Load initial blogs and tags
  useEffect(() => {
    loadBlogs();
    loadTags();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('blog-posts-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'blog_posts',
        },
        (payload) => {
          // Add new blog post to the list
          const newPost = convertSupabaseToBlogPost(payload.new as SupabaseBlogPost);
          setBlogs(prevBlogs => [newPost, ...prevBlogs]);
          loadTags(); // Refresh tags
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'blog_posts',
        },
        (payload) => {
          // Update existing blog post
          const updatedPost = convertSupabaseToBlogPost(payload.new as SupabaseBlogPost);
          setBlogs(prevBlogs => 
            prevBlogs.map(blog => 
              blog.id === updatedPost.id.toString() ? updatedPost : blog
            )
          );
          loadTags(); // Refresh tags
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'blog_posts',
        },
        (payload) => {
          // Remove deleted blog post
          setBlogs(prevBlogs => 
            prevBlogs.filter(blog => blog.id !== payload.old.id.toString())
          );
          loadTags(); // Refresh tags
        }
      )
      .subscribe();

    // Clean up subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      let data: SupabaseBlogPost[] = [];
      
      if (searchQuery) {
        data = await blogService.searchBlogs(searchQuery);
      } else if (selectedTag) {
        data = await blogService.fetchBlogsByTag(selectedTag);
      } else {
        data = await blogService.fetchPublishedBlogs();
      }
      
      // Convert Supabase blog posts to existing BlogPost interface
      const convertedBlogs = data.map(convertSupabaseToBlogPost);
      
      // Limit the number of blogs based on showAll state
      const limit = showAll ? convertedBlogs.length : 3;
      setBlogs(convertedBlogs.slice(0, limit));
    } catch (err) {
      console.error('Error loading blogs:', err);
      setError('Failed to load blog posts. Please try again later.');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const loadTags = async () => {
    try {
      const tags = await blogService.fetchAllTags();
      setAvailableTags(tags);
    } catch (error) {
      console.error('Error loading tags:', error);
      // Don't show error to user for tags, just log it
    }
  };

  // Debounced search function
  const debouncedSearch = debounce(() => {
    loadBlogs();
  }, 300);

  // Handle search and filter changes
  useEffect(() => {
    debouncedSearch();
  }, [searchQuery, selectedTag, showAll]);

  const handleBlogClick = (blog: BlogPost) => {
    setSelectedBlog(blog);
    openBlogModal();
  };

  const handleTagFilter = (tag: string) => {
    setSelectedTag(selectedTag === tag ? '' : tag);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTag('');
  };

  return (
    <section 
      id="blog" 
      className="py-16 lg:py-24 bg-background"
      role="region"
      aria-labelledby="blog-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 
              id="blog-heading"
              className="text-3xl lg:text-5xl font-bold text-text-primary mb-6"
            >
              PlayOra
              <span className="text-primary block lg:inline lg:ml-3">Blog</span>
            </h2>
            <p className="text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest sports tips, app features, community stories, 
              and insights from the PlayOra team and our global community.
            </p>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <Input
                type="text"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 w-full rounded-full border-border focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background-secondary"
              />
            </div>

            {/* Tag Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-text-secondary">
                <Tag className="w-4 h-4" />
                <span className="font-medium">Filter by topic:</span>
              </div>
              
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagFilter(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedTag === tag
                      ? 'bg-primary text-textLight shadow-green'
                      : 'bg-background-secondary text-text-secondary hover:bg-primary/10 hover:text-primary border border-border'
                  }`}
                >
                  {tag}
                </button>
              ))}
              
              {(searchQuery || selectedTag) && (
                <Button
                  onClick={clearFilters}
                  variant="ghost"
                  size="sm"
                  className="text-text-secondary hover:text-error"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Blog Posts</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <Button
                onClick={loadBlogs}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className={`grid grid-cols-1 ${showAll ? 'md:grid-cols-2 lg:grid-cols-3' : 'lg:grid-cols-3'} gap-8`}
          >
            {blogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => handleBlogClick(blog)}
              >
                <div className="bg-background-secondary rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full border border-border hover:border-primary/20 hover:-translate-y-1">
                  {/* Cover Image */}
                  {blog.cover && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.cover}
                        alt={`Cover image for ${blog.title}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          // Handle image loading errors
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {blog.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-text-secondary mb-4 leading-relaxed line-clamp-3">
                      {truncateText(blog.excerpt, 120)}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-text-secondary">
                      <div className="flex items-center gap-2">
                        <span>By {blog.author.name}</span>
                        <span>•</span>
                        <span>{formatDate(blog.date)}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{getReadingTime(blog.content)} min read</span>
                      </div>
                    </div>

                    {/* Read More */}
                    <div className="flex items-center gap-2 mt-4 text-primary font-medium group-hover:gap-3 transition-all duration-300">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* No Results */}
        {!loading && !error && blogs.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-background-secondary border border-border rounded-lg p-8 max-w-md mx-auto">
              <Search className="w-12 h-12 text-text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-medium text-text-primary mb-2">No Blog Posts Found</h3>
              <p className="text-text-secondary mb-4">
                {searchQuery || selectedTag 
                  ? 'Try adjusting your search or filters.' 
                  : 'Check back later for new blog posts.'}
              </p>
              {(searchQuery || selectedTag) && (
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-textLight"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Load More / Show All Toggle */}
        {!loading && !error && blogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-textLight px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
            >
              {showAll ? 'Show Recent Posts' : 'View All Posts'}
            </Button>
          </motion.div>
        )}
      </div>

      {/* Blog Modal */}
      {selectedBlog && (
        <BlogModal
          blog={selectedBlog}
          isOpen={isBlogModalOpen}
          onClose={closeBlogModal}
        />
      )}
    </section>
  );
}