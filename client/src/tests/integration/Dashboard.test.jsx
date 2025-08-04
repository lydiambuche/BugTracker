import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../../pages/dashboard.jsx'; 
import { AuthProvider } from '../../context/authContext.jsx';

describe('Dashboard Page', () => {
  const setup = () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it('renders bug summary section', () => {
    setup();
    expect(screen.getByText(/total bugs/i)).toBeInTheDocument();
    expect(screen.getByText(/open bugs/i)).toBeInTheDocument();
    expect(screen.getByText(/closed bugs/i)).toBeInTheDocument();
    expect(screen.getByText(/high priority/i)).toBeInTheDocument();
  });

  it('renders recent bugs section', () => {
    setup();
    expect(screen.getByText(/recent bugs/i)).toBeInTheDocument();
  });

  it('renders bug trends or chart section', () => {
    setup();
    expect(screen.getByText(/bug trends/i)).toBeInTheDocument();
  });
});
