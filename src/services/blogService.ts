import { supabase, BlogPost } from '../lib/supabaseClient'
import { authService } from './authService'

// Validation functions
const validateBlogPost = (post: Partial<BlogPost>): string[] => {
  const errors: string[] = []
  
  if (!post.title || post.title.trim().length === 0) {
    errors.push('Title is required')
  } else if (post.title.length > 200) {
    errors.push('Title must be less than 200 characters')
  }
  
  if (!post.slug || post.slug.trim().length === 0) {
    errors.push('Slug is required')
  } else if (!/^[a-z0-9-]+$/.test(post.slug)) {
    errors.push('Slug can only contain lowercase letters, numbers, and hyphens')
  }
  
  if (post.excerpt && post.excerpt.length > 500) {
    errors.push('Excerpt must be less than 500 characters')
  }
  
  if (!post.content || post.content.trim().length === 0) {
    errors.push('Content is required')
  }
  
  if (!post.author_name || post.author_name.trim().length === 0) {
    errors.push('Author name is required')
  }
  
  if (post.tags && Array.isArray(post.tags)) {
    if (post.tags.length > 10) {
      errors.push('Maximum 10 tags allowed')
    }
    
    for (const tag of post.tags) {
      if (tag.length > 30) {
        errors.push('Each tag must be less than 30 characters')
      }
    }
  }
  
  return errors
}

// Check if user is authorized to perform blog operations
const checkAuthorization = async (): Promise<boolean> => {
  try {
    const isAdmin = await authService.isAdmin()
    return isAdmin
  } catch (error) {
    console.error('Authorization check failed:', error)
    return false
  }
}

// Fetch all published blog posts
export async function fetchPublishedBlogs() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('date', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data as BlogPost[]
}

// Fetch blog post by slug
export async function fetchBlogBySlug(slug: string) {
  // Validate slug
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    throw new Error('Invalid slug format')
  }
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data as BlogPost
}

// Fetch all blog posts (for admin)
export async function getAllBlogs() {
  // Check authorization
  const isAuthorized = await checkAuthorization()
  if (!isAuthorized) {
    throw new Error('Unauthorized access')
  }
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('date', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data as BlogPost[]
}

// Create a new blog post
export async function createBlog(post: Partial<BlogPost>) {
  // Check authorization
  const isAuthorized = await checkAuthorization()
  if (!isAuthorized) {
    throw new Error('Unauthorized access')
  }
  
  // Validate input
  const errors = validateBlogPost(post)
  if (errors.length > 0) {
    throw new Error(errors.join(', '))
  }
  
  const { data, error } = await supabase
    .from('blog_posts')
    .insert(post)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data as BlogPost
}

// Update a blog post
export async function updateBlog(id: string, post: Partial<BlogPost>) {
  // Check authorization
  const isAuthorized = await checkAuthorization()
  if (!isAuthorized) {
    throw new Error('Unauthorized access')
  }
  
  // Validate input
  const errors = validateBlogPost(post)
  if (errors.length > 0) {
    throw new Error(errors.join(', '))
  }
  
  const { data, error } = await supabase
    .from('blog_posts')
    .update(post)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data as BlogPost
}

// Delete a blog post
export async function deleteBlog(id: string) {
  // Check authorization
  const isAuthorized = await checkAuthorization()
  if (!isAuthorized) {
    throw new Error('Unauthorized access')
  }
  
  // Validate id
  if (!id) {
    throw new Error('Blog post ID is required')
  }
  
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  return true
}

// Get all unique tags
export async function fetchAllTags() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('tags')
    .eq('published', true)
    .not('tags', 'is', null)

  if (error) {
    throw new Error(error.message)
  }

  // Extract all unique tags from the posts
  const allTags = data.flatMap(post => post.tags || [])
  const uniqueTags = [...new Set(allTags)]
  
  return uniqueTags
}

// Search blogs by query
export async function searchBlogs(query: string) {
  // Validate query
  if (!query || query.trim().length === 0) {
    return []
  }
  
  if (query.length > 100) {
    throw new Error('Search query too long')
  }
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)

  if (error) {
    throw new Error(error.message)
  }

  return data as BlogPost[]
}

// Fetch blogs by tag
export async function fetchBlogsByTag(tag: string) {
  // Validate tag
  if (!tag || tag.trim().length === 0) {
    return []
  }
  
  if (tag.length > 30) {
    throw new Error('Tag too long')
  }
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .contains('tags', [tag])

  if (error) {
    throw new Error(error.message)
  }

  return data as BlogPost[]
}

// Export the service functions as an object for easier import
export const blogService = {
  fetchPublishedBlogs,
  fetchBlogBySlug,
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  fetchAllTags,
  searchBlogs,
  fetchBlogsByTag
}