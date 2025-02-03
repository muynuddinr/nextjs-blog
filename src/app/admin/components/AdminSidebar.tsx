'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  const menuItems = [
    { title: 'Dashboard', path: '/admin', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { title: 'All Blogs', path: '/admin/blogs', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { title: 'Add Blog', path: '/admin/blogs/add', icon: 'M12 4v16m8-8H4' },
  ];

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/logout', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        router.refresh(); // Refresh the page to update server components
        router.push('/'); // Redirect to main website instead of /admin/login
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <aside className="w-64 bg-gray-900 text-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Admin Panel
        </h2>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center px-6 py-4 text-gray-300 hover:bg-gray-800 transition-colors ${
              pathname === item.path ? 'bg-gray-800 border-l-4 border-purple-500' : ''
            }`}
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={item.icon}
              />
            </svg>
            {item.title}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center px-6 py-4 text-red-400 hover:bg-gray-800 transition-colors mt-auto"
        >
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar; 