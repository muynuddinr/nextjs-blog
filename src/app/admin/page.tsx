'use client';

import { useEffect, useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Stats {
  total: number;
  published: number;
  drafts: number;
  monthlyStats: {
    month: string;
    total: number;
    published: number;
    drafts: number;
  }[];
  categoryDistribution: { category: string; count: number }[];
  statusDistribution: { status: string; count: number }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    published: 0,
    drafts: 0,
    monthlyStats: [],
    categoryDistribution: [],
    statusDistribution: []
  });

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(error => console.error('Error fetching stats:', error));
  }, []);

  const monthlyData = {
    labels: stats.monthlyStats.map(stat => stat.month),
    datasets: [
      {
        label: 'Total Posts',
        data: stats.monthlyStats.map(stat => stat.total),
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.5)',
      },
      {
        label: 'Published',
        data: stats.monthlyStats.map(stat => stat.published),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
      },
      {
        label: 'Drafts',
        data: stats.monthlyStats.map(stat => stat.drafts),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  };

  const categoryData = {
    labels: stats.categoryDistribution.map(item => item.category),
    datasets: [{
      data: stats.categoryDistribution.map(item => item.count),
      backgroundColor: [
        'rgba(147, 51, 234, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(34, 197, 94, 0.8)',
      ],
    }],
  };

  const statusData = {
    labels: ['Published', 'Drafts'],
    datasets: [{
      data: [stats.published, stats.drafts],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(59, 130, 246, 0.8)',
      ],
    }],
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-gray-200 mb-2">Total Posts</h3>
          <p className="text-3xl font-bold text-purple-500">{stats.total}</p>
        </div>
        
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-gray-200 mb-2">Published</h3>
          <p className="text-3xl font-bold text-green-500">{stats.published}</p>
        </div>
        
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-gray-200 mb-2">Drafts</h3>
          <p className="text-3xl font-bold text-blue-500">{stats.drafts}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-gray-200 mb-4">Monthly Statistics</h3>
          <Bar data={monthlyData} options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                ticks: { color: 'rgb(156, 163, 175)' }
              },
              x: {
                ticks: { color: 'rgb(156, 163, 175)' }
              }
            },
            plugins: {
              legend: {
                labels: { color: 'rgb(156, 163, 175)' }
              }
            }
          }} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-gray-200 mb-4">Category Distribution</h3>
          <Doughnut data={categoryData} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
                labels: { color: 'rgb(156, 163, 175)' }
              }
            }
          }} />
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-gray-200 mb-4">Post Status</h3>
          <Doughnut data={statusData} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
                labels: { color: 'rgb(156, 163, 175)' }
              }
            }
          }} />
        </div>
      </div>
    </div>
  );
} 