import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider"; // Import AuthProvider
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; // Import Signup
import Coupons from "./pages/Coupons";
import ReportingIssue from "./pages/ReportingIssue";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> {/* Add Signup route */}
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/report-issue" element={<ReportingIssue />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
