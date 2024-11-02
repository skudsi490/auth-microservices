import { useNavigate } from 'react-router-dom';

const RequesterDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.location.href = "http://localhost:4000/logout"; 
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-gray-800 bg-opacity-50 rounded-lg shadow-2xl">
<h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-indigo-600 text-transparent bg-clip-text">
        Requester Dashboard
      </h2>

      <button
        onClick={() => navigate('/create-request')}
        className="w-full py-3 px-4 mb-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold rounded-lg shadow-lg hover:from-yellow-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
      >
        Create New Request
      </button>

      <button
        onClick={handleLogout}
        className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default RequesterDashboard;
