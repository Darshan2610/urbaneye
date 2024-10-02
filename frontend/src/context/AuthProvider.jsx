import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Initialize auth state with data from localStorage
  const [auth, setAuth] = useState(() => {
    const storedUserId = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");
    const storedToken = localStorage.getItem("token");

    if (storedUserId && storedRole && storedToken) {
      return {
        user: { _id: storedUserId },
        role: storedRole,
        token: storedToken,
      };
    } else {
      return {
        user: null,
        role: null,
        token: null,
      };
    }
  });

  // Sync auth state with localStorage
  useEffect(() => {
    if (auth.user) {
      localStorage.setItem("user", auth.user._id);
      localStorage.setItem("role", auth.role);
      localStorage.setItem("token", auth.token);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("token");
    }
  }, [auth]);

  // Memoized login function
  const login = useCallback((user, userRole, token) => {
    console.log("Logging in user:", user);
    setAuth({ user, role: userRole, token });
  }, []);

  // Memoized logout function
  const logout = useCallback(() => {
    console.log("Logging out...");
    setAuth({ user: null, role: null, token: null });
    navigate("/"); // Navigate to home page after logout
  }, [navigate]);

  // Memoize the auth value to prevent unnecessary re-renders
  const authValue = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth, login, logout]
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
