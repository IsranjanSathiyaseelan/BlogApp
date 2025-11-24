import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogDetails from "./pages/BlogDetails";
import EditBlog from "./components/EditBlog";
import NotFound from "./components/NotFound";

import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get("/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (err) {
          setError("Failed to fetch user data");
          localStorage.removeItem("token");
        }
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-xl text-white">Loading...</div>
        </div>
      ) : (
        <Router>
          <Navbar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Blog Details Page */}
            <Route path="/blog/:id" element={<BlogDetails />} />

            {/* Edit Blog Page (Protected) */}
            <Route
              path="/edit/:id"
              element={user ? <EditBlog /> : <Navigate to="/login" />}
            />

            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
            />

            <Route
              path="/register"
              element={
                user ? <Navigate to="/" /> : <Register setUser={setUser} />
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
