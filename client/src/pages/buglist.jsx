// src/pages/BugListPage.jsx
import { useState } from 'react';
import { dummyBugs } from '../data/dummyBugs';
import BugTable from '../components/BugTable';
import BugFilters from '../components/BugFilters';
import BugActions from '../components/BugActions';

export default function BugListPage() {
  const [bugs, setBugs] = useState(dummyBugs);
  const [filters, setFilters] = useState({
    priority: '',
    status: '',
    assignedTo: '',
    search: '',
  });

  const handleSearch = (value) => {
    setFilters({ ...filters, search: value });
  };

  const filteredBugs = bugs.filter(bug => {
    return (
      (!filters.priority || bug.priority === filters.priority) &&
      (!filters.status || bug.status === filters.status) &&
      (!filters.assignedTo || bug.assignedTo === filters.assignedTo) &&
      (!filters.search || bug.title.toLowerCase().includes(filters.search.toLowerCase()) || bug.id.includes(filters.search))
    );
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bug List</h1>
      <BugFilters filters={filters} setFilters={setFilters} handleSearch={handleSearch} />
      <BugActions bugs={filteredBugs} />
      <BugTable bugs={filteredBugs} />
    </div>
  );
}
