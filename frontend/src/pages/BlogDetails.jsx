import { useParams, useNavigate } from "react-router-dom";
import blogs from "../assets/blogs";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog)
    return (
      <div className="text-center text-red-500 text-2xl mt-20">
        Blog Not Found
      </div>
    );

  const handleEdit = () => {
    // Navigate to an edit page for this blog
    navigate(`/edit/${blog.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img src={blog.image} className="w-full h-80 object-cover rounded-lg" />

      <div className="flex justify-between items-center mt-6">
        <h1 className="text-4xl font-bold">{blog.title}</h1>
        <button
          onClick={handleEdit}
          className="bg-gray-600 hover:bg-gray-800 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
      </div>

      <p className="text-gray-500 mt-2">
        {blog.date} • Written by {blog.author}
      </p>

      <p className="mt-6 text-lg leading-relaxed">{blog.content}</p>
    </div>
  );
}
