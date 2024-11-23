import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <header
      className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md"
      style={{
        background: "linear-gradient(to right, #1f2937, #374151)",
      }}
    >
      <h1 className="text-2xl font-bold">
        VRV Security 
      </h1>
      <nav className="flex space-x-4 items-center text-sm font-medium">
        {user ? (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-600 text-white px-4 py-2 rounded transition"
                  : "text-gray-300 hover:bg-blue-500 hover:text-white px-4 py-2 rounded transition"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/create-user"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-600 text-white px-4 py-2 rounded transition"
                  : "text-gray-300 hover:bg-blue-500 hover:text-white px-4 py-2 rounded transition"
              }
            >
              Add User
            </NavLink>
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:bg-red-500 hover:text-white px-4 py-2 rounded transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-600 text-white px-4 py-2 rounded transition"
                  : "text-gray-300 hover:bg-blue-500 hover:text-white px-4 py-2 rounded transition"
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-600 text-white px-4 py-2 rounded transition"
                  : "text-gray-300 hover:bg-blue-500 hover:text-white px-4 py-2 rounded transition"
              }
            >
              Register
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
