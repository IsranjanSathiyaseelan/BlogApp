import React from "react";
import { Link, useNavigate } from "react-router-dom";

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
        
        {/* Left Logo */}
        <Link to="/" className="text-white text-lg font-bold">
          BlogApp
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* Show username */}
              <span className="text-white font-medium">
                Welcome, {user.username}
              </span>

              {/* Create Blog Button */}
              <Link
                to="/create"
                className="text-white bg-gray-600 px-4 py-2 rounded hover:bg-gray-800"
              >
                Create Blog
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="text-white mx-2 hover:underline" to="/login">
                Login
              </Link>
              <Link className="text-white mx-2 hover:underline" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
