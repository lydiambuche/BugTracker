import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login.jsx';
import Dashboard from './pages/dashboard.jsx';
import CreateBug from './pages/createbug.jsx';
import BugList from './pages/buglist.jsx';
import Navbar from './components/navbar.jsx';
import ReportPage from "./components/report.jsx";
import { AuthProvider } from './context/authcontext.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-bug" element={<CreateBug />} />
              <Route path="/bug-list" element={<BugList />} />
              <Route path="/report" element={<ReportPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
