import { useEffect, useState } from 'react';
import axios from 'axios';

interface Request {
  _id: string;
  title: string;
  description: string;
  status: string;
  urgency: string;          
  requesterEmail: string;    
  approverEmail: string;     
}

const ApproverDashboard = () => {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:4002/requests");
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, []);

  const handleApprove = async (_id: string) => {
    try {
      const response = await axios.post(`http://localhost:4002/approve-request/${_id}`);
      alert(response.data.message);
      setRequests((prevRequests) =>
        prevRequests.map((request) => (request._id === _id ? { ...request, status: 'Approved' } : request))
      );
    } catch (error) {
      console.error("Error approving request:", error);
      alert("Failed to approve request");
    }
  };

  const handleReject = async (_id: string) => {
    try {
      const response = await axios.post(`http://localhost:4002/reject-request/${_id}`);
      alert(response.data.message);
      setRequests((prevRequests) =>
        prevRequests.map((request) => (request._id === _id ? { ...request, status: 'Rejected' } : request))
      );
    } catch (error) {
      console.error("Error rejecting request:", error);
      alert("Failed to reject request");
    }
  };

  const handleLogout = () => {
    window.location.href = "http://localhost:4000/logout";
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gray-800 bg-opacity-50 rounded-lg shadow-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-indigo-600 text-transparent bg-clip-text">
        Supervisor Dashboard
      </h2>
      <ul>
        {requests.map((request) => (
          <li key={request._id} className="mb-4 p-4 bg-gray-700 rounded-lg border border-gray-600 text-white">
            <p><strong>Title:</strong> {request.title}</p>
            <p><strong>Description:</strong> {request.description}</p>
            <p><strong>Status:</strong> {request.status}</p>
            <p><strong>Urgency:</strong> {request.urgency}</p>  
            <p><strong>Requester Email:</strong> {request.requesterEmail}</p>  
            <p><strong>Approver Email:</strong> {request.approverEmail}</p>  
            <div className="mt-4">
              <button
                onClick={() => handleApprove(request._id)}
                className="py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 mr-2"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(request._id)}
                className="py-2 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={handleLogout}
        className="w-full py-3 px-4 mt-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default ApproverDashboard;
