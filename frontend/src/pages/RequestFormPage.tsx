import React, { useState } from 'react';
import axios from 'axios';

const RequestFormPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    urgency: '',
    requesterEmail: '',
    approverEmail: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4002/create-request", formData);
      if (response.status === 200) {
        alert("Request submitted successfully!");
        window.location.href = "/dashboard"; // Redirect to dashboard after successful submission
      }
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-2xl max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">
        Create a New Request
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400"
          required
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white"
          required
        >
          <option value="">Select Type</option>
          <option value="Leave">Leave</option>
          <option value="Equipment">Equipment</option>
          <option value="Overtime">Overtime</option>
        </select>
        <select
          name="urgency"
          value={formData.urgency}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white"
          required
        >
          <option value="">Select Urgency</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="email"
          name="requesterEmail"
          value={formData.requesterEmail}
          onChange={handleChange}
          placeholder="Requester Email"
          className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400"
          required
        />
        <input
          type="email"
          name="approverEmail"
          value={formData.approverEmail}
          onChange={handleChange}
          placeholder="Approver Email"
          className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400"
          required
        />
        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestFormPage;
