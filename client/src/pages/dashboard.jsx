import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Bell, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [bugs, setBugs] = useState([]);

  // Simulated bug data
  useEffect(() => {
    const sampleBugs = [
      { title: 'Login error', description: 'Fails on incorrect email', priority: 'High', status: 'Open', assignedTo: 'Alice', date: '2025-07-26' },
      { title: 'Page crash', description: 'Dashboard crashes on load', priority: 'Medium', status: 'Closed', assignedTo: 'Bob', date: '2025-07-25' },
      { title: 'Missing data', description: 'Bug list not loading', priority: 'Low', status: 'Open', assignedTo: 'Carol', date: '2025-07-27' },
    ];
    setBugs(sampleBugs);
  }, []);

  const totalBugs = bugs.length;
  const openBugs = bugs.filter(b => b.status === 'Open').length;
  const closedBugs = bugs.filter(b => b.status === 'Closed').length;
  const priorityCount = {
    High: bugs.filter(b => b.priority === 'High').length,
    Medium: bugs.filter(b => b.priority === 'Medium').length,
    Low: bugs.filter(b => b.priority === 'Low').length,
  };

  const bugTrends = [
    { date: 'Jul 25', reported: 3, closed: 1 },
    { date: 'Jul 26', reported: 2, closed: 0 },
    { date: 'Jul 27', reported: 1, closed: 2 },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4 space-y-4">
        <h2 className="text-xl font-bold text-green-600">Bug Tracker</h2>
        <nav className="space-y-2">
          <Link to="/" className="block hover:text-green-600">Home</Link>
          <Link to="/bug-list" className="block hover:text-green-600">Bug List</Link>
          <Link to="/create-bug" className="block hover:text-green-600">Report Bug</Link>
          <Link to="/settings" className="block hover:text-green-600">Settings</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <div className="flex items-center space-x-4">
            <Bell className="cursor-pointer" />
            <User className="cursor-pointer" />
            <LogOut className="cursor-pointer text-red-500" />
          </div>
        </div>

        {/* Bug Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <SummaryCard title="Total Bugs" count={totalBugs} color="bg-blue-500" />
          <SummaryCard title="Open Bugs" count={openBugs} color="bg-red-500" />
          <SummaryCard title="Closed Bugs" count={closedBugs} color="bg-green-500" />
          <SummaryCard title="High Priority" count={priorityCount.High} color="bg-yellow-500" />
        </div>

        {/* Recent Bugs */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Recent Bugs</h2>
          <ul className="space-y-2">
            {bugs.map((bug, index) => (
              <li key={index} className="border-b pb-2">
                <p className="font-semibold">{bug.title}</p>
                <p className="text-sm text-gray-600">{bug.description}</p>
                <p className="text-sm">Priority: {bug.priority} | Status: {bug.status} | Assigned to: {bug.assignedTo}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Bug Trends */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Bug Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bugTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="reported" fill="#4299e1" name="Reported" />
              <Bar dataKey="closed" fill="#48bb78" name="Closed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

// Card Component for Summary Stats
const SummaryCard = ({ title, count, color }) => (
  <div className={`p-4 text-white rounded shadow ${color}`}>
    <h3 className="text-lg">{title}</h3>
    <p className="text-2xl font-bold">{count}</p>
  </div>
);

export default Dashboard;
