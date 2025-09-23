import React, { useState, useEffect } from 'react';
import { BlogPost } from '../../lib/supabaseClient';
import { blogService } from '../../services/blogService';
import { supabase } from '../../lib/supabaseClient';

interface BlogFormProps {
  blog: BlogPost | null;
  onSubmit: () => void;
  onCancel: () => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ blog, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [tags, setTags] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('BlogForm received blog prop:', blog);
    if (blog) {
      setTitle(blog.title);
      setSlug(blog.slug);
      setExcerpt(blog.excerpt || '');
      setContent(blog.content);
      setAuthorName(blog.author_name);
      setTags(Array.isArray(blog.tags) ? blog.tags.join(', ') : '');
      setCoverImage(blog.cover_image || '');
      setPublished(blog.published);
    } else {
      // Set default values for new blog post
      setTitle('');
      setSlug('');
      setExcerpt('');
      setContent('');
      setAuthorName('');
      setTags('');
      setCoverImage('');
      setPublished(false);
    }
  }, [blog]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!blog) {
      // Only auto-generate slug for new posts
      setSlug(generateSlug(newTitle));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setError(null);
      
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }
      
      const file = e.target.files[0];
      
      // Validate file type
      if (!file.type.match('image.*')) {
        throw new Error('Please select an image file.');
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size too large. Maximum size is 5MB.');
      }
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `blog-covers/${fileName}`;
      
      // Upload the file
      const { data, error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Get public URL for the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);
        
      setCoverImage(publicUrl);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to upload image.';
      setError(errorMessage);
      console.error('Error uploading image:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const blogData = {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        author_name: authorName,
        tags: tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : null,
        cover_image: coverImage || null,
        published,
        date: new Date().toISOString(),
        created_at: blog ? blog.created_at : new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      console.log('Submitting blog data:', blogData);
      console.log('Blog ID for update:', blog?.id);

      if (blog) {
        // Update existing blog post
        console.log(`Calling updateBlog with ID: ${blog.id}`);
        await blogService.updateBlog(blog.id, blogData);
      } else {
        // Create new blog post
        console.log('Creating new blog post');
        await blogService.createBlog(blogData);
      }

      onSubmit();
    } catch (err: any) {
      // More detailed error handling
      let errorMessage = 'Failed to save blog post. Please try again.';
      
      if (err.message) {
        errorMessage = err.message;
      }
      
      // If it's a network error, provide a more user-friendly message
      if (err.message && err.message.includes('NetworkError')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      }
      
      setError(errorMessage);
      console.error('Error saving blog post:', err);
      
      // Log additional debugging information
      console.error('Full error object:', JSON.stringify(err, Object.getOwnPropertyNames(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Debug information */}
      {blog && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800">
            <strong>Editing Blog Post:</strong> ID: {blog.id} | Title: {blog.title}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
            Slug *
          </label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <p className="mt-1 text-sm text-gray-500">
            The URL-friendly version of the title
          </p>
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <p className="mt-1 text-sm text-gray-500">
            A short summary of the blog post
          </p>
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content *
          </label>
          <textarea
            id="content"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="authorName" className="block text-sm font-medium text-gray-700">
            Author Name *
          </label>
          <input
            type="text"
            id="authorName"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <p className="mt-1 text-sm text-gray-500">
            Separate tags with commas
          </p>
        </div>

        <div className="sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">
            Cover Image
          </label>
          <div className="mt-1 flex items-center">
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="Enter image URL or upload an image"
              className="flex-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <label className="ml-4 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
              Upload
              <input
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
              />
            </label>
          </div>
          {uploading && (
            <p className="mt-2 text-sm text-gray-500">Uploading image...</p>
          )}
          {coverImage && (
            <div className="mt-3">
              <img 
                src={coverImage} 
                alt="Preview" 
                className="h-32 w-32 object-cover rounded-md" 
              />
            </div>
          )}
        </div>

        <div className="sm:col-span-6">
          <div className="flex items-center">
            <input
              id="published"
              name="published"
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
              Published
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading || uploading}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || uploading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Saving...' : (blog ? 'Update Post' : 'Create Post')}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;