import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  category: string;
  readTime: string;
  content: string;
  status: string;
}

let blogs: BlogPost[] = [];

export { blogs };

export function updateBlogs(newBlogs: BlogPost[]) {
  blogs = [...newBlogs];
  return blogs;
}

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({});
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const blog = await request.json();
    const newBlog = await Blog.create({
      ...blog,
      date: new Date().toISOString().split('T')[0]
    });
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  blogs = [];
  return NextResponse.json({ success: true });
} 