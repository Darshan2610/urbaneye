import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import UserManagement from "../components/UserManagement";
import ReportManagement from "../components/ReportManagement";
import CreateAdminUser from "../components/CreateAdminUser";
import CouponManagement from "../components/CouponsManagement";

const AdminDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar stays fixed */}
      <AdminSidebar />

      {/* Main content container */}
      <div className="ml-64 flex-1">
        {/* Header is fixed, so padding is added to account for its height */}
        <AdminHeader />
        <div className="pt-16 p-4">
          {" "}
          {/* Adds padding to account for fixed header */}
          <Routes>
            <Route path="/users" element={<UserManagement />} />
            <Route path="/reports" element={<ReportManagement />} />
            <Route path="/create-admin" element={<CreateAdminUser />} />
            <Route path="/coupons" element={<CouponManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
