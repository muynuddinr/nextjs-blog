import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  excerpt: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  readTime: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: String, required: true, default: 'draft' }
}, {
  timestamps: true
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema); 