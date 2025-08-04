import Bug from '../models/bug.js';

export const getDashboardStats = async (req, res) => {
  try {
    // 1. Basic Stats
    const totalBugs = await Bug.countDocuments();
    const openBugs = await Bug.countDocuments({ status: 'open' });
    const closedBugs = await Bug.countDocuments({ status: 'closed' });

    // 2. Bugs by Priority
    const bugsByPriority = await Bug.aggregate([
      { $group: { _id: '$priority', count: { $sum: 1 } } },
    ]);

    // 3. Recent Bugs (last 5)
    const recentBugs = await Bug.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title description priority status assignedTo createdAt');

    // 4. Trends: bugs reported by date
    const trends = await Bug.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      totalBugs,
      openBugs,
      closedBugs,
      bugsByPriority,
      recentBugs,
      trends,
    });
  } catch (error) {
    console.error('Dashboard Error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
};
