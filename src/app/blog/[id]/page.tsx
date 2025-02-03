'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

const BlogPost = () => {
  const router = useRouter();
  const params = useParams();
  
  // This would typically come from an API or database
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with React",
      date: "2024-03-20",
      excerpt: "Learn the basics of React and how to build your first application...",
      author: "John Doe",
      category: "React",
      readTime: "5 min read",
      content: `React is a powerful JavaScript library for building user interfaces. In this comprehensive guide, we'll walk through the fundamentals of React and create your first application from scratch.

We'll cover essential concepts like components, props, state management, and hooks. By the end of this tutorial, you'll have a solid foundation in React development.`
    },
    {
      id: 2,
      title: "Mastering Tailwind CSS",
      date: "2024-03-18",
      excerpt: "Discover the power of utility-first CSS framework...",
      author: "Jane Smith",
      category: "CSS",
      readTime: "4 min read",
      content: `Tailwind CSS has revolutionized the way we style web applications. This guide explores advanced techniques, best practices, and optimization strategies for building beautiful user interfaces with Tailwind CSS.

Learn how to customize your design system, create reusable components, and leverage Tailwind's powerful features to their full potential.`
    },
  ];

  const post = blogPosts.find(post => post.id === Number(params.id));

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post not found</h1>
          <button
            onClick={() => router.push('/blog')}
            className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white">
      <div className="container mx-auto px-4 py-16">
        <button
          onClick={() => router.push('/blog')}
          className="mb-8 flex items-center text-gray-400 hover:text-blue-400 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </button>

        <article className="max-w-3xl mx-auto">
          <div className="mb-8">
            <span className="px-4 py-1.5 bg-blue-500/10 text-blue-300 rounded-full text-sm font-medium
              border border-blue-500/20 shadow-sm shadow-blue-500/10">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {post.title}
          </h1>

          <div className="flex items-center mb-8 text-gray-400">
            <span className="font-medium">{post.date}</span>
            <span className="mx-2">•</span>
            <span className="text-gray-300 font-medium flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {post.author}
            </span>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readTime}
            </span>
          </div>

          <div className="prose prose-lg prose-invert max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-300 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost; 