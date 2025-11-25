import blogs from "../assets/blogs";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter blogs based on search query (title, description, or category)
  const filteredBlogs = blogs.filter((blog) =>
    [blog.title, blog.description, blog.category]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Search input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 outline-none focus:border-gray-400"
        />
      </div>

      {/* Blogs grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
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
                <div className="absolute inset-0 bg-opacity-30 flex flex-col justify-end p-4 space-y-1">
                  {/* Category Badge */}
                  <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full w-max">
                    {blog.category}
                  </span>

                  {/* Title */}
                  <h2 className="text-white text-lg font-bold">{blog.title}</h2>
                </div>
              </div>

              {/* Card content */}
              <div className="p-4">
                <p className="text-gray-700 text-sm line-clamp-3">{blog.description}</p>

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
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No blogs found matching "{searchQuery}"
          </p>
        )}
      </div>
    </div>
  );
}
