import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Header = () => {
  const { auth, logout } = useAuth();
  
  // Check if the user is an admin
  const isAdmin = auth.user && auth.user.role === 'admin'; // Assuming 'admin' is the role identifier

  return (
    <>
      <div className="container mx-auto mb-[80px]">
        <div className="navbar bg-warning px-10 fixed top-0 left-0 right-0 z-50">
          <div className="navbar-start ">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
            </div>
            <Link to="/" className="btn btn-ghost text-3xl">
              daisyUI
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {/* Render different links based on user role */}
              {isAdmin ? (
                <>
                  <li>
                    <Link
                      to="/admin/dashboard"
                      className="btn btn-ghost text-xl"
                    >
                      Admin Dashboard
                    </Link>
                  </li>
                  {/* Add more admin-specific links here if needed */}
                </>
              ) : (
                <>
                  <li>
                    <a className="btn btn-ghost text-xl">About</a>
                  </li>
                  <li>
                    <Link to="/coupons" className="btn btn-ghost text-xl">
                      Coupons
                    </Link>
                  </li>
                  <li>
                    <Link to="/report-issue" className="btn btn-ghost text-xl">
                      Report Issue
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          {auth.user ? (
            <div className="navbar-end space-x-3">
              <div className="dropdown dropdown-end">
                <Link
                  to="/profile" // Redirect to profile page on avatar click
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="User Avatar"
                      src={
                        auth.user && auth.user.profilePhotoUrl
                          ? `http://localhost:5000/${auth.user.profilePhotoUrl}` // Ensure the URL is correct
                          : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" // Fallback image
                      }
                    />
                  </div>
                </Link>
              </div>
              <button onClick={logout}>
                <a>Logout</a>
              </button>
            </div>
          ) : (
            <div className="navbar-end space-x-3">
              <Link to="/signup" className="btn">
                Register
              </Link>
              <Link to="/login" className="btn">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;