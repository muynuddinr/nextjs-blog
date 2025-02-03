import { ReactNode } from 'react';
import AdminSidebar from './components/AdminSidebar';
import { cookies } from 'next/headers';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');

  if (!token) {
    return children;
  }

  return (
    <div className="flex h-screen bg-gray-950">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="container mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
} 