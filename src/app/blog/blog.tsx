'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  category: string;
  readTime: string;
  content: string;
  status?: string;
}

const BlogPage = () => {
  const router = useRouter();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        // Only show published posts on the public blog page
        const publishedPosts = data.filter((post: BlogPost) => 
          post.status === 'published'
        );
        setBlogPosts(publishedPosts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      });
  }, []);

  // Filter blog posts based on search query
  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-20 pt-24">
          <h1 className="text-7xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
            My Blog
          </h1>
          <p className="text-gray-400 text-center text-xl max-w-2xl mx-auto leading-relaxed">
            Exploring the world of web development, one article at a time
          </p>
          {/* Replace category buttons with search input */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-xl bg-gray-800/50 text-white placeholder-gray-400
                  border border-gray-700/30 focus:border-blue-500/50 focus:outline-none focus:ring-2 
                  focus:ring-blue-500/20 transition-all duration-300"
              />
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Update to use filteredPosts instead of blogPosts */}
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-2xl p-8 
                transform hover:scale-105 transition-all duration-500 
                border border-gray-800 hover:border-blue-500/50 
                shadow-lg hover:shadow-blue-500/20 backdrop-blur-sm
                relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex justify-between items-center mb-6">
                <span className="px-4 py-1.5 bg-blue-500/10 text-blue-300 rounded-full text-sm font-medium
                  border border-blue-500/20 shadow-sm shadow-blue-500/10">
                  {post.category}
                </span>
                <span className="text-gray-400 text-sm font-medium flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {post.readTime}
                </span>
              </div>

              <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors duration-300">
                {post.title}
              </h2>

              <div className="flex items-center mb-4 text-sm text-gray-400">
                <span className="font-medium">{post.date}</span>
                <span className="mx-2">•</span>
                <span className="text-gray-300 font-medium flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {post.author}
                </span>
              </div>

              <p className="text-gray-400 mb-8 line-clamp-3 leading-relaxed">{post.excerpt}</p>

              <button
                onClick={() => router.push(`/blog/${post.id}`)}
                className="w-full px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 
                text-white rounded-xl hover:from-blue-700 hover:to-purple-700 
                transition-all duration-300 font-medium flex items-center justify-center group
                shadow-lg hover:shadow-blue-600/30 relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Read More
                  <svg
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
