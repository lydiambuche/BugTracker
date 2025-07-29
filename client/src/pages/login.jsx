import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Eye, EyeOff, Bug } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('⚠️ Please enter both email and password.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ Login successful! Welcome back ${data.email}`);
        localStorage.setItem('token', data.token);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000); 
      } else {
        setMessage(data.message || '❌ Login failed');
      }
    } catch (error) {
      setMessage('❌ Server error. Please try again later.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 relative px-4">
      {/* Hamburger Menu */}
      <div className="absolute top-4 right-4 z-50">
        <button
          className="text-black focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <Menu size={28} />
        </button>

        {menuOpen && (
          <ul className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-md border z-50 text-sm p-2 space-y-2">
            <li><a href="/" className="hover:text-blue-600">Home</a></li>
            <li><a href="/dashboard" className="hover:text-blue-600">Dashboard</a></li>
            <li><a href="/bug-list" className="hover:text-blue-600">Buglist</a></li>
            <li><a href="/report" className="hover:text-blue-600">Report</a></li>
            <li><a href="/settings" className="hover:text-blue-600">Settings</a></li>
          </ul>
        )}
      </div>

      {/* Main Card */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Logo */}
        <div className="mb-6 text-center">
          <Bug size={48} className="mx-auto text-green-600" />
          <h1 className="text-2xl font-bold mt-2 text-gray-800">BugTracker</h1>
          <p className="text-gray-600 mt-1 text-sm">
            Redefining bug resolution and team collaboration.
            <br />
            Break barriers, build brilliance
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-black text-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-1 text-center">Welcome Back</h2>
          <p className="text-center mb-6 text-gray-300">Sign in to your account to continue</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-white">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10 bg-white text-black"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="text-right text-sm mt-1 mb-4">
                <a href="/forgot-password" className="text-yellow-600 font-medium hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black py-2 rounded-md hover:bg-gray-200 transition duration-300 font-semibold"
            >
              Sign In
            </button>

            {message && (
              <p className={`mt-4 text-center ${message.includes('successful') ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </p>
            )}
          </form>

          <p className="mt-4 text-sm text-center text-gray-300">
            Don’t have an account?{' '}
            <a href="#" className="text-green-400 hover:underline">
              Sign up
            </a>
          </p>

          {/* Social Login */}
          <div className="mt-6">
            <button
              onClick={() => alert('Google login not implemented')}
              className="w-full border border-gray-300 py-2 rounded hover:bg-gray-100 flex items-center justify-center gap-2 bg-white text-black"
            >
              <img src="/google-icon.svg" alt="Google" className="h-5 w-5" />
              <span>Login with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
