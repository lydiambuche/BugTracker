export default function BugFilters({ filters, setFilters, handleSearch }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
      <input
        type="text"
        placeholder="Search by ID or title..."
        className="input input-bordered w-full"
        onChange={(e) => handleSearch(e.target.value)}
      />

      <select className="select select-bordered w-full" value={filters.priority} onChange={e => setFilters({ ...filters, priority: e.target.value })}>
        <option value="">Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <select className="select select-bordered w-full" value={filters.status} onChange={e => setFilters({ ...filters, status: e.target.value })}>
        <option value="">Status</option>
        <option value="Open">Open</option>
        <option value="Closed">Closed</option>
      </select>

      <select className="select select-bordered w-full" value={filters.assignedTo} onChange={e => setFilters({ ...filters, assignedTo: e.target.value })}>
        <option value="">Assigned To</option>
        <option value="Alice">Alice</option>
        <option value="Bob">Bob</option>
      </select>
    </div>
  );
}
