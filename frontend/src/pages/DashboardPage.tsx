import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto p-8 bg-gray-800 bg-opacity-50 rounded-lg shadow-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-indigo-600 text-transparent bg-clip-text">
        Dashboard
      </h2>
      <div className="space-y-4">
        <button
          onClick={() => navigate("/create-request")}
          className="w-full py-3 px-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold rounded-lg shadow-lg hover:from-yellow-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Create New Request
        </button>
        <button
          onClick={() => navigate("/approval-dashboard")}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Go to Approval Dashboard
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
