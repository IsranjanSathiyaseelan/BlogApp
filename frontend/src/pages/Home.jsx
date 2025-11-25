import blogs from "../assets/blogs";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
        >
          {/* Image with overlay */}
          <div className="relative h-56">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-opacity-30 flex items-end p-4">
              <h2 className="text-white text-lg font-bold">{blog.title}</h2>
            </div>
          </div>

          {/* Card content */}
          <div className="p-4">
            <p className="text-gray-700 text-sm line-clamp-3">
              {blog.description}
            </p>

            {/* Author and date */}
            <div className="mt-2 text-gray-500 text-xs flex justify-between">
              <span>By {blog.author}</span>
              <span>{blog.date}</span>
            </div>

            {/* Read More button */}
            <Link
              to={`/blog/${blog.id}`}
              className="inline-block mt-4 px-4 py-2 bg-gray-600 text-white font-semibold rounded hover:bg-gray-800 transition-colors duration-200"
            >
              Read More →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
