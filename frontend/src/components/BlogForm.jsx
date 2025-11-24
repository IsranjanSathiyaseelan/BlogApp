import React from "react";

const BlogForm = ({ blog, setBlog, file, setFile, onSubmit, submitLabel = "Submit" }) => {
  return (
    <form onSubmit={onSubmit} className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={blog.title || ""}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          rows="6"
          className="w-full border p-2 rounded"
          value={blog.desc || ""}
          onChange={(e) => setBlog({ ...blog, desc: e.target.value })}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Image URL (optional)</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={blog.img || ""}
          onChange={(e) => setBlog({ ...blog, img: e.target.value })}
          placeholder="http://... or leave blank to upload"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Or upload image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {file && <p className="text-xs mt-2">Selected: {file.name}</p>}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:opacity-95"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
