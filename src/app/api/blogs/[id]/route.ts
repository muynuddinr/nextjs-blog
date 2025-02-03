import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const deletedBlog = await Blog.findByIdAndDelete(params.id);
    
    if (!deletedBlog) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}