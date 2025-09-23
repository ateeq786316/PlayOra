import React from 'react';
import { BlogPost } from '../../lib/supabaseClient';

interface BlogListProps {
  blogs: BlogPost[];
  onEdit: (blog: BlogPost) => void;
  onDelete: (id: string) => void;
}

const BlogList: React.FC<BlogListProps> = ({ blogs, onEdit, onDelete }) => {
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadge = (published: boolean | undefined) => {
    if (published) {
      return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Published</span>;
    }
    return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Draft</span>;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Author
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {blogs.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                No blog posts found
              </td>
            </tr>
          ) : (
            blogs.map((blog) => (
              <tr key={blog.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                  <div className="text-sm text-gray-500 line-clamp-2">{blog.excerpt}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {blog.author_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(blog.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(blog.published)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      console.log('Editing blog with ID:', blog.id);
                      console.log('Blog object:', blog);
                      onEdit(blog);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      console.log('Deleting blog with ID:', blog.id);
                      onDelete(blog.id.toString());
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BlogList;