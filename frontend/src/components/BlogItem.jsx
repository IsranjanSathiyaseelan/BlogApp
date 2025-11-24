// frontend/src/components/BlogItem.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SAMPLE_IMG = "/mnt/data/e0f7eedf-c76f-4cd1-aafa-36325d936ed1.png";

const BlogItem = ({ blog, currentUser, token, onDeleted }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${blog._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      onDeleted(blog._id);
    } catch (err) {
      alert(err.message || "Failed to delete");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 mb-10 bg-white p-4 rounded shadow">
      <div className="md:w-1/2">
        <img
          src={blog.img || SAMPLE_IMG}
          alt={blog.title}
          className="rounded-lg object-cover w-full h-[250px]"
        />
      </div>

      <div className="md:w-1/2">
        <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
        <p className="text-gray-500 text-sm mb-4">
          {blog.author?.username || "Unknown"} • {new Date(blog.createdAt).toLocaleString()}
        </p>
        <p className="text-gray-700 leading-relaxed">{blog.desc}</p>

        {currentUser && currentUser.id === blog.author?._id && (
          <div className="flex gap-3 mt-4">
            <Link to={`/edit/${blog._id}`} className="bg-yellow-500 text-white px-3 py-1 rounded">
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogItem;
