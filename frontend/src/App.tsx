import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RequesterDashboard from './pages/RequesterDashboard';
import RequestFormPage from './pages/RequestFormPage';
import ApproverDashboard from './pages/ApproverDashboard';
import RoleRedirectPage from './pages/RoleRedirectPage';
import FloatingShape from './components/FloatingShape';

function App() {
  return (
<div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center relative overflow-hidden">
  <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />
      
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/role-redirect" element={<RoleRedirectPage />} />
          <Route path="/dashboard" element={<RequesterDashboard />} />
          <Route path="/create-request" element={<RequestFormPage />} />
          <Route path="/approval-dashboard" element={<ApproverDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
