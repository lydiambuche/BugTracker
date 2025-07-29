// src/components/ReportPage.jsx
import React, { useState } from "react";
import { mockBugs } from "../data/mockbug";
import { exportToCSV } from "../utils/exportutils.jsx";

export default function ReportPage() {
  const [reportType, setReportType] = useState("bug-summary");
  const [filters, setFilters] = useState({
    priority: "",
    status: "",
    assignedTo: "",
  });

  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredBugs = mockBugs.filter((bug) => {
    const matchPriority =
      filters.priority === "" || bug.priority === filters.priority;
    const matchStatus =
      filters.status === "" || bug.status === filters.status;
    const matchUser =
      filters.assignedTo === "" || bug.assignedTo === filters.assignedTo;
    return matchPriority && matchStatus && matchUser;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Bug Report</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select
          className="p-2 border rounded"
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="bug-summary">Bug Summary</option>
          <option value="bug-trend">Bug Trend Analysis</option>
          <option value="user-performance">User Performance</option>
        </select>

        <input
          type="date"
          className="p-2 border rounded"
          placeholder="From"
          value={dateRange.from}
          onChange={(e) =>
            setDateRange({ ...dateRange, from: e.target.value })
          }
        />
        <input
          type="date"
          className="p-2 border rounded"
          placeholder="To"
          value={dateRange.to}
          onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <select
          name="priority"
          className="p-2 border rounded"
          onChange={handleFilterChange}
        >
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
        </select>

        <select
          name="status"
          className="p-2 border rounded"
          onChange={handleFilterChange}
        >
          <option value="">All Statuses</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>

        <select
          name="assignedTo"
          className="p-2 border rounded"
          onChange={handleFilterChange}
        >
          <option value="">All Users</option>
          <option value="Jane Doe">Jane Doe</option>
          <option value="John Smith">John Smith</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Priority</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Assigned To</th>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2">Updated</th>
            </tr>
          </thead>
          <tbody>
            {filteredBugs.map((bug) => (
              <tr key={bug.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{bug.id}</td>
                <td className="px-4 py-2">{bug.title}</td>
                <td className="px-4 py-2">{bug.priority}</td>
                <td className="px-4 py-2">{bug.status}</td>
                <td className="px-4 py-2">{bug.assignedTo}</td>
                <td className="px-4 py-2">{bug.createdAt}</td>
                <td className="px-4 py-2">{bug.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export Button */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => exportToCSV(filteredBugs)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Export as CSV
        </button>
        <button
          disabled
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded cursor-not-allowed"
        >
          Export as PDF (Coming Soon)
        </button>
      </div>
    </div>
  );
}
