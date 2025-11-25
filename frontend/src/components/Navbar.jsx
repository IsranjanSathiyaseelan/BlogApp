import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          BlogApp
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <NavLink
                to="/create"
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Create Blog
              </NavLink>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="text-white hover:underline">
                Login
              </NavLink>
              <NavLink to="/register" className="text-white hover:underline">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
