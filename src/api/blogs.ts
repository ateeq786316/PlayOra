import { blogService } from '../services/blogService';
import { BlogPost } from '../lib/supabaseClient';

// Types for API responses
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Get all published blog posts
export async function getPublishedBlogs(): Promise<ApiResponse<BlogPost[]>> {
  try {
    const blogs = await blogService.fetchPublishedBlogs();
    return {
      success: true,
      data: blogs
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to fetch published blogs'
    };
  }
}

// Get blog post by slug
export async function getBlogBySlug(slug: string): Promise<ApiResponse<BlogPost>> {
  try {
    const blog = await blogService.fetchBlogBySlug(slug);
    return {
      success: true,
      data: blog
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to fetch blog post'
    };
  }
}

// Get all blog posts (admin only)
export async function getAllBlogs(): Promise<ApiResponse<BlogPost[]>> {
  try {
    const blogs = await blogService.getAllBlogs();
    return {
      success: true,
      data: blogs
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to fetch all blogs'
    };
  }
}

// Create a new blog post (admin only)
export async function createBlog(blogData: Partial<BlogPost>): Promise<ApiResponse<BlogPost>> {
  try {
    const blog = await blogService.createBlog(blogData);
    return {
      success: true,
      data: blog,
      message: 'Blog post created successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to create blog post'
    };
  }
}

// Update a blog post (admin only)
export async function updateBlog(id: string, blogData: Partial<BlogPost>): Promise<ApiResponse<BlogPost>> {
  try {
    const blog = await blogService.updateBlog(id, blogData);
    return {
      success: true,
      data: blog,
      message: 'Blog post updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to update blog post'
    };
  }
}

// Delete a blog post (admin only)
export async function deleteBlog(id: string): Promise<ApiResponse<boolean>> {
  try {
    await blogService.deleteBlog(id);
    return {
      success: true,
      message: 'Blog post deleted successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to delete blog post'
    };
  }
}

// Get all tags
export async function getAllTags(): Promise<ApiResponse<string[]>> {
  try {
    const tags = await blogService.fetchAllTags();
    return {
      success: true,
      data: tags
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to fetch tags'
    };
  }
}

// Search blogs
export async function searchBlogs(query: string): Promise<ApiResponse<BlogPost[]>> {
  try {
    const blogs = await blogService.searchBlogs(query);
    return {
      success: true,
      data: blogs
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to search blogs'
    };
  }
}

// Get blogs by tag
export async function getBlogsByTag(tag: string): Promise<ApiResponse<BlogPost[]>> {
  try {
    const blogs = await blogService.fetchBlogsByTag(tag);
    return {
      success: true,
      data: blogs
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to fetch blogs by tag'
    };
  }
}