import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET() {
  try {
    await connectDB();
    
    const totalPosts = await Blog.countDocuments();
    const publishedPosts = await Blog.countDocuments({ status: 'published' });
    const draftPosts = await Blog.countDocuments({ status: 'draft' });

    // Get monthly statistics for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const monthlyStats = await Blog.aggregate([
      {
        $match: {
          date: { $gte: sixMonthsAgo.toISOString().split('T')[0] }
        }
      },
      {
        $group: {
          _id: {
            month: { $substr: ['$date', 0, 7] },
            status: '$status'
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.month',
          stats: {
            $push: {
              status: '$_id.status',
              count: '$count'
            }
          }
        }
      },
      {
        $project: {
          month: '$_id',
          total: { $sum: '$stats.count' },
          published: {
            $sum: {
              $map: {
                input: '$stats',
                as: 'stat',
                in: {
                  $cond: [
                    { $eq: ['$$stat.status', 'published'] },
                    '$$stat.count',
                    0
                  ]
                }
              }
            }
          },
          drafts: {
            $sum: {
              $map: {
                input: '$stats',
                as: 'stat',
                in: {
                  $cond: [
                    { $eq: ['$$stat.status', 'draft'] },
                    '$$stat.count',
                    0
                  ]
                }
              }
            }
          }
        }
      },
      {
        $sort: { month: 1 }
      }
    ]);

    // Get category distribution
    const categoryDistribution = await Blog.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          category: '$_id',
          count: 1,
          _id: 0
        }
      }
    ]);

    return NextResponse.json({
      total: totalPosts,
      published: publishedPosts,
      drafts: draftPosts,
      monthlyStats,
      categoryDistribution
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
} 