import { Link } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-lg">Bug Tracker</h1>
      <ul className="flex gap-4">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/create-bug">Create Bug</Link></li>
        <li><Link to="/bug-list">Bug List</Link></li>
        <li><button onClick={logout} className="bg-red-500 px-2 py-1 rounded">Logout</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;
