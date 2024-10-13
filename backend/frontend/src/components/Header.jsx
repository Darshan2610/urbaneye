import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Header = () => {
  const { auth, logout } = useAuth();

  // Check if the user is an admin
  const isAdmin = auth.user && auth.user.role === "admin"; // Assuming 'admin' is the role identifier
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true); // Add blue background on scroll
      } else {
        setScrolling(false); // Remove background when back to top
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="container mx-auto mb-[80px]">
        <div
          className={`navbar px-5 fixed top-0 left-0 right-0 z-50 pt-2 pb-2  transition-all duration-300 
          ${scrolling ? "bg-blue-950 text-white" : ""}`}
        >
          <div className="navbar-start pr-2">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden pl-0 pr-1"
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
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {/* Render different links based on user role */}
                {isAdmin ? (
                  <>
                    <li>
                      <NavLink
                        to="/admin/dashboard"
                        className={({ isActive }) =>
                          isActive
                            ? "text-md bg-blue-950 text-white"
                            : "text-md hover:bg-blue-950 hover:text-white"
                        }
                      >
                        Admin Dashboard
                      </NavLink>
                    </li>
                    {/* Add more admin-specific links here if needed */}
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          isActive
                            ? "text-md bg-blue-950 text-white"
                            : "text-md hover:bg-blue-950 hover:text-white"
                        }
                      >
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/coupons"
                        className={({ isActive }) =>
                          isActive
                            ? "text-md bg-blue-950 text-white"
                            : "text-md hover:bg-blue-950 hover:text-white"
                        }
                      >
                        Coupons
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/report-issue"
                        className={({ isActive }) =>
                          isActive
                            ? "text-md bg-blue-950 text-white"
                            : "text-md hover:bg-blue-950 hover:text-white"
                        }
                      >
                        Report Issue
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <Link to="/" className=" ">
              <img
                src="/logo2.png"
                alt="logo"
                className=" w-15 h-8 sm:w-15 sm:h-8 md:w-30 md:h-9 lg:w-25 lg:h-10"
              />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {/* Render different links based on user role */}
              {isAdmin ? (
                <>
                  <li>
                    <NavLink
                      to="/admin/dashboard"
                      className={({ isActive }) =>
                        isActive
                          ? "btn btn-ghost text-xl bg-blue-950 text-white"
                          : "btn btn-ghost text-xl hover:bg-blue-950 hover:text-white"
                      }
                    >
                      Admin Dashboard
                    </NavLink>
                  </li>
                  {/* Add more admin-specific links here if needed */}
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive
                          ? "btn btn-ghost text-xl bg-blue-950 text-white"
                          : "btn btn-ghost text-xl hover:bg-blue-950 hover:text-white"
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/coupons"
                      className={({ isActive }) =>
                        isActive
                          ? "btn btn-ghost text-xl bg-blue-950 text-white"
                          : "btn btn-ghost text-xl hover:bg-blue-950 hover:text-white"
                      }
                    >
                      Coupons
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/report-issue"
                      className={({ isActive }) =>
                        isActive
                          ? "btn btn-ghost text-xl bg-blue-950 text-white"
                          : "btn btn-ghost text-xl hover:bg-blue-950 hover:text-white"
                      }
                    >
                      Report Issue
                    </NavLink>
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
                          ? `/${auth.user.profilePhotoUrl}` // Ensure the URL is correct
                          : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" // Fallback image
                      }
                    />
                  </div>
                </Link>
              </div>
              <Link
                onClick={logout}
                className="btn btn-ghost text-xl hover:bg-blue-950 hover:text-white"
              >
                Logout
              </Link>
            </div>
          ) : (
            <div className="navbar-end space-x-3">
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive
                    ? "btn text-lg bg-blue-950 text-white"
                    : "btn text-lg hover:bg-blue-950 hover:text-white"
                }
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "btn text-lg bg-blue-950 text-white"
                    : "btn text-lg hover:bg-blue-950 hover:text-white"
                }
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
