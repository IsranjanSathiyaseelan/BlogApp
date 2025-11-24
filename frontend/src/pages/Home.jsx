import blogs from "../assets/blogs";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="bg-white shadow-md rounded-lg overflow-hidden"
        >
          <img src={blog.image} alt="" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-600 mt-2">{blog.description}</p>

            <Link
              to={`/blog/${blog.id}`}
              className="inline-block mt-4 text-gray-800 font-semibold"
            >
              Read More →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
