'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast, Toaster } from 'react-hot-toast';

interface Blog {
  _id: string;
  title: string;
  author: string;
  category: string;
  status: string;
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      });
  };

  const handleDelete = async (id: string, title: string) => {
    toast((t: any) => (
      <div className="flex items-center gap-4">
        <div>
          <div className="font-medium mb-1">Delete Blog?</div>

          <div className="text-sm text-gray-400">Are you sure you want to delete "{title}"?</div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              deletePost(id);
              toast.dismiss(t.id);
            }}
            className="px-3 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-2 bg-gray-700 text-white rounded-lg text-sm hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      position: 'top-center',
      className: 'bg-gray-800 text-white p-4 rounded-xl border border-gray-700'
    });
  };

  const deletePost = async (id: string) => {
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Blog post deleted successfully', {
          className: 'bg-gray-800 text-white border border-gray-700',
          duration: 3000,
          icon: '🗑️'
        });
        fetchBlogs();
      }
    } catch (error) {
      toast.error('Error deleting blog post', {
        className: 'bg-gray-800 text-white border border-gray-700'
      });
      console.error('Error deleting blog:', error);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        toast.success(`Status updated to ${newStatus}`, {
          className: 'bg-gray-800 text-white border border-gray-700',
          duration: 3000,
          icon: '✅'
        });
        fetchBlogs();
      }
    } catch (error) {
      toast.error('Error updating status', {
        className: 'bg-gray-800 text-white border border-gray-700'
      });
      console.error('Error updating blog status:', error);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400">Loading...</div>;
  }

  return (
    <div>
      <Toaster />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          All Blogs
        </h1>
        <Link
          href="/admin/blogs/add"
          className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg text-white transition-colors"
        >
          Add New Blog
        </Link>
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="px-6 py-4 text-left text-gray-400">Title</th>
              <th className="px-6 py-4 text-left text-gray-400">Author</th>
              <th className="px-6 py-4 text-left text-gray-400">Category</th>
              <th className="px-6 py-4 text-left text-gray-400">Status</th>
              <th className="px-6 py-4 text-left text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="border-b border-gray-800">
                <td className="px-6 py-4 text-gray-300">{blog.title}</td>
                <td className="px-6 py-4 text-gray-300">{blog.author}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">
                    {blog.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={blog.status}
                    onChange={(e) => handleStatusChange(blog._id, e.target.value)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer
                      ${blog.status === 'published' 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }
                      hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                  >
                    <option value="published" className="bg-gray-900 text-green-400">Published</option>
                    <option value="draft" className="bg-gray-900 text-yellow-400">Draft</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => handleDelete(blog._id, blog.title)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 