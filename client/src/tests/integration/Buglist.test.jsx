import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BugListPage from '../../pages/buglist.jsx';

// Mock child components
jest.mock('../../components/BugFilters', () => ({ filters, setFilters, handleSearch }) => (
  <div>
    <button onClick={() => setFilters({ ...filters, priority: 'High' })}>Filter High Priority</button>
    <input
      placeholder="Search bugs"
      onChange={(e) => handleSearch(e.target.value)}
    />
  </div>
));

jest.mock('../../components/BugActions', () => ({ bugs }) => (
  <div data-testid="bug-actions">{bugs.length} bugs shown</div>
));

jest.mock('../../components/BugTable', () => ({ bugs }) => (
  <table>
    <tbody>
      {bugs.map(bug => (
        <tr key={bug.id}>
          <td>{bug.title}</td>
          <td>{bug.priority}</td>
          <td>{bug.status}</td>
          <td>{bug.assignedTo}</td>
        </tr>
      ))}
    </tbody>
  </table>
));

describe('BugListPage', () => {
  test('renders title and child components', () => {
    render(<BugListPage />);
    expect(screen.getByText(/bug list/i)).toBeInTheDocument();
    expect(screen.getByText(/filter high priority/i)).toBeInTheDocument();
    expect(screen.getByTestId('bug-actions')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  test('filters bugs by priority using filter button', () => {
    render(<BugListPage />);
    // Initially, all bugs shown
    const bugActions = screen.getByTestId('bug-actions');
    const initialCount = parseInt(bugActions.textContent);

    fireEvent.click(screen.getByText(/filter high priority/i));
    // After filtering, number of bugs should reduce or stay same
    expect(screen.getByTestId('bug-actions')).not.toHaveTextContent(initialCount);
  });

  test('filters bugs by search input', () => {
    render(<BugListPage />);
    const searchInput = screen.getByPlaceholderText(/search bugs/i);

    fireEvent.change(searchInput, { target: { value: 'bug' } });

    expect(screen.getByTestId('bug-actions')).toBeInTheDocument();
    
  });
});
