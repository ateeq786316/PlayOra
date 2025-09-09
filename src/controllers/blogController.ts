/**
 * PlayOra Blog Controller
 * Handles all blog-related data operations and business logic
 */

import { fetchBlogs, getBlogBySlug, getAllTags, getRecentBlogs, getRelatedBlogs } from '../data/blogs';
import { BlogPost, FetchParams, BlogApiResponse } from '../models/types';

export class BlogController {
  /**
   * Load blog posts with pagination, filtering, and search
   */
  static async loadBlogPage(params: FetchParams): Promise<BlogApiResponse> {
    try {
      return await fetchBlogs(params);
    } catch (error) {
      console.error('Error loading blog page:', error);
      return {
        data: [],
        total: 0,
        page: 1,
        totalPages: 0
      };
    }
  }

  /**
   * Search blogs by query term
   */
  static async searchBlogs(query: string, limit: number = 10): Promise<BlogPost[]> {
    try {
      const response = await fetchBlogs({ q: query, limit });
      return response.data;
    } catch (error) {
      console.error('Error searching blogs:', error);
      return [];
    }
  }

  /**
   * Get blog post by slug
   */
  static async getBlog(slug: string): Promise<BlogPost | null> {
    try {
      return await getBlogBySlug(slug);
    } catch (error) {
      console.error('Error getting blog by slug:', error);
      return null;
    }
  }

  /**
   * Get recent blog posts for homepage
   */
  static getRecentPosts(count: number = 3): BlogPost[] {
    try {
      return getRecentBlogs(count);
    } catch (error) {
      console.error('Error getting recent posts:', error);
      return [];
    }
  }

  /**
   * Get all available tags
   */
  static getAllAvailableTags(): string[] {
    try {
      return getAllTags();
    } catch (error) {
      console.error('Error getting tags:', error);
      return [];
    }
  }

  /**
   * Get related posts by overlapping tags
   */
  static async getRelatedPosts(currentSlug: string, limit: number = 3): Promise<BlogPost[]> {
    try {
      return await getRelatedBlogs(currentSlug, limit);
    } catch (error) {
      console.error('Error getting related posts:', error);
      return [];
    }
  }

  /**
   * Get filtered blogs by tag
   */
  static async getBlogsByTag(tag: string, limit: number = 10): Promise<BlogPost[]> {
    try {
      const response = await fetchBlogs({ tag, limit });
      return response.data;
    } catch (error) {
      console.error('Error getting blogs by tag:', error);
      return [];
    }
  }

  /**
   * Get blog statistics
   */
  static getBlogStats() {
    try {
      const tags = getAllTags();
      const recentPosts = getRecentBlogs(1000);
      return {
        totalPosts: recentPosts.length,
        totalTags: tags.length,
        mostRecentPost: recentPosts[0]?.date || null,
        tags
      };
    } catch (error) {
      console.error('Error getting blog stats:', error);
      return {
        totalPosts: 0,
        totalTags: 0,
        mostRecentPost: null,
        tags: []
      };
    }
  }
}