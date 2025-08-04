import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import Login from '../../pages/login.jsx';
import { AuthProvider } from '../../context/authContext.jsx';

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return { ...actual, useNavigate: jest.fn() };
});

global.fetch = jest.fn();

describe('Login Page', () => {
  const setup = () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  afterEach(() => jest.clearAllMocks());

  test('renders login form elements', () => {
    setup();
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('shows error if fields are empty', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(await screen.findByText(/please enter both email and password/i)).toBeInTheDocument();
  });

  test('shows error message on failed login', async () => {
    setup();
    fetch.mockResolvedValueOnce({ ok: false, json: async () => ({ message: 'Invalid credentials' }) });
    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });

  test('shows success message and navigates on successful login', async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    setup();

    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ email: 'test@example.com', token: 'fake-token' }) });

    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/login successful/i)).toBeInTheDocument();
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
});
