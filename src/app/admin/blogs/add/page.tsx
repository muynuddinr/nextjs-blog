'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddBlog() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    readTime: '',
    status: 'draft'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        router.push('/admin/blogs');
      }
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Add New Blog
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-300 mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Excerpt</label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-purple-500"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Content</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-purple-500"
            rows={10}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 mb-2">Author</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 mb-2">Read Time</label>
            <input
              type="text"
              value={formData.readTime}
              onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-purple-500"
              placeholder="e.g., 5 min read"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-purple-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg text-white transition-colors"
          >
            Add Blog
          </button>
        </div>
      </form>
    </div>
  );
} 