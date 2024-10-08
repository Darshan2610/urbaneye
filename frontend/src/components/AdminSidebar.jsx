import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink

const AdminSidebar = () => {
  return (
    <div className="w-64 fixed left-0  bg-gray-800 text-white h-screen">
      <h2 className="text-2xl p-4">Admin Panel</h2>
      <ul className="space-y-2">
        <li>
          <NavLink
            to="/admin/users"
            className={
              ({ isActive }) => `block p-4 ${isActive ? "bg-gray-700" : ""}` // Highlight active link
            }
          >
            Manage Users
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/reports"
            className={
              ({ isActive }) => `block p-4 ${isActive ? "bg-gray-700" : ""}` // Highlight active link
            }
          >
            View Reports
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/create-admin"
            className={
              ({ isActive }) => `block p-4 ${isActive ? "bg-gray-700" : ""}` // Highlight active link
            }
          >
            Create Admin User
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/coupons"
            className={
              ({ isActive }) => `block p-4 ${isActive ? "bg-gray-700" : ""}` // Highlight active link
            }
          >
            Coupons Management
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
