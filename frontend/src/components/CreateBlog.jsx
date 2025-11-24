// frontend/src/components/CreateBlog.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogForm from "./BlogForm";

const CreateBlog = () => {
  const [blog, setBlog] = useState({ title: "", desc: "", img: "" });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const API = "http://localhost:5000/api/blogs";
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (file) {
        const fd = new FormData();
        fd.append("title", blog.title);
        fd.append("desc", blog.desc);
        fd.append("image", file); // backend multer expects "image"
        // send
        const res = await fetch(API, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: fd,
        });
        if (!res.ok) throw new Error("Create failed");
      } else {
        const res = await fetch(API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(blog),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || "Create failed");
        }
      }

      navigate("/");
    } catch (err) {
      alert(err.message || "Failed to create blog");
    }
  };

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold text-center mb-4">Create Blog</h1>
      <BlogForm
        blog={blog}
        setBlog={setBlog}
        file={file}
        setFile={setFile}
        onSubmit={handleSubmit}
        submitLabel="Create"
      />
    </div>
  );
};

export default CreateBlog;
