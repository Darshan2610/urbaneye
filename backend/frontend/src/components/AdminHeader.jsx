import React from "react";
import { useAuth } from "../context/AuthProvider";

const AdminHeader = () => {
  const { auth, logout } = useAuth();

  return (
    <div className="bg-gray-800 text-white p-4 fixed left-64 right-0 z-10">
      <div className="flex justify-between">
        <h1 className="text-xl">Admin Dashboard</h1>
        <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;
