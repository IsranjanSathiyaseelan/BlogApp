// frontend/src/components/CreateBlog.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBlog = ({ addBlog }) => {
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    image: "",
    category: "Travel",
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const categories = ["Travel", "Adventure", "Culture", "Food", "Lifestyle"];

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBlog = {
      id: Date.now(),
      title: blog.title,
      description: blog.description,
      content: blog.description,
      author: "Current User", // Replace with actual logged-in user
      date: new Date().toISOString().split("T")[0],
      category: blog.category,
      image: file ? URL.createObjectURL(file) : "/images/photo.jpg.avif",
    };

    if (addBlog) addBlog(newBlog);

    alert("Blog created successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-white to-blue-50 shadow-2xl rounded-3xl p-10 w-full max-w-lg border border-gray-200 animate-fadeIn"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-900 tracking-wide">
          Create New Blog
        </h2>

        {/* Title */}
        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-400 shadow-sm transition duration-200"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={blog.description}
            onChange={handleChange}
            placeholder="Enter blog description"
            rows="5"
            className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-400 shadow-sm transition duration-200"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">Category</label>
          <select
            name="category"
            value={blog.category}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm hover:ring-2 hover:ring-blue-200 transition duration-200"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Image */}
        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full border border-gray-300 rounded-2xl p-2 cursor-pointer hover:border-gray-400 transition duration-200"
          />
          {file && (
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="mt-4 w-full h-48 object-cover rounded-2xl shadow-lg border border-gray-200"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full from-gray-600 to-gray-800 text-white py-4 rounded-2xl font-bold text-lg hover:from-gray-700 hover:to-gray-900 transition duration-300 shadow-lg hover:shadow-2xl"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
