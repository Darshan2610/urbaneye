import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider"; // Import AuthProvider
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; // Import Signup
import Coupons from "./pages/Coupons";
import ReportingIssue from "./pages/ReportingIssue";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import Profile from "./pages/profile";
import AdminDashboard from "./pages/AdminDashBoard"; // Import Admin Dashboard
import UserDetails from "./pages/UserDetails";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/coupons" exact element={<Coupons />} />
          <Route path="/admin/user-details/:email" exact element={<UserDetails />} />
          
          <Route
            path="/report-issue"
            element={
              <ProtectedRoute>
                <ReportingIssue />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/*" exact element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          } /> {/* Admin Dashboard Route */}
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
