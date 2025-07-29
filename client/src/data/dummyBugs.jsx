// src/data/dummyBugs.js
export const dummyBugs = [
  {
    id: 'BUG-001',
    title: 'Login not working',
    description: 'Users can’t log in using Google auth',
    priority: 'High',
    status: 'Open',
    assignedTo: 'Alice',
    tags: ['Auth', 'Frontend'],
    createdAt: '2025-07-25',
    updatedAt: '2025-07-27',
  },
  {
    id: 'BUG-002',
    title: '404 on Dashboard',
    description: 'Dashboard not found after login',
    priority: 'Medium',
    status: 'Closed',
    assignedTo: 'Bob',
    tags: ['Backend'],
    createdAt: '2025-07-20',
    updatedAt: '2025-07-22',
  },
  // Add more bugs
];
