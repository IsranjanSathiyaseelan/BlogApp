// frontend/src/components/EditBlog.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogForm from "./BlogForm";

const EditBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const API = "http://localhost:5000/api/blogs";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API}/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        // normalize fields for form
        setBlog({
          title: data.title || "",
          desc: data.desc || "",
          img: data.img || "",
        });
      } catch (err) {
        alert("Failed to load blog");
        navigate("/");
      }
    };
    fetchBlog();
  }, [id, navigate]);

  if (!blog) return <p className="text-center mt-8">Loading...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // If file present, upload via formData to a dedicated endpoint or allow PUT with formData.
      // Our backend routes previously expect JSON for PUT; to keep simple we'll send JSON and if user uploaded file, we first upload it to /api/blogs (POST temp) - but simpler: use img URL or re-use existing uploading flow.
      // Here: if file exists, upload it via a temporary POST to same API (but that creates a new blog) — not ideal.
      // Instead recommend to use image URL for editing, or implement multipart PUT on backend.
      // We'll implement PUT with JSON (img must be url/path).
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blog),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Update failed");
      }
      navigate("/");
    } catch (err) {
      alert(err.message || "Failed to update");
    }
  };

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold text-center mb-4">Edit Blog</h1>
      <BlogForm
        blog={blog}
        setBlog={setBlog}
        file={file}
        setFile={setFile}
        onSubmit={handleSubmit}
        submitLabel="Update"
      />
      <p className="text-xs text-gray-500 mt-2 text-center">
        Note: For editing images, provide an image URL in the field or implement multipart PUT on the backend to support uploading new images.
      </p>
    </div>
  );
};

export default EditBlog;
