import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Blog admin dashboard',
};

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-gray-200 mb-2">Total Posts</h3>
          <p className="text-3xl font-bold text-purple-500">24</p>
        </div>
        
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-gray-200 mb-2">Published</h3>
          <p className="text-3xl font-bold text-green-500">18</p>
        </div>
        
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-gray-200 mb-2">Drafts</h3>
          <p className="text-3xl font-bold text-blue-500">6</p>
        </div>
      </div>
    </div>
  );
} 