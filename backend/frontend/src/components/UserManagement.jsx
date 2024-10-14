import React, { useEffect, useState } from "react";
import axios from "axios"; // Import your configured axios instance
import { Link } from "react-router-dom"; // Import Link for navigation

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      const response = await axios.get('/api/admin/allusers', { // Use the axios instance
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error.message); // Fixed error logging
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on the search term
  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
      />

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">
                <Link to={`/admin/user-details/${user.email}`} className="text-blue-500 hover:underline">
                  {user.email}
                </Link>
              </td>
              <td className="py-2 px-4 border-b">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
