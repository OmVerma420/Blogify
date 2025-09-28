import BlogCard from "@/components/ui/blogCard";
import { Loading } from "@/components/ui/loading";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";

function Index() {
  const { data: blogData, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/auth/blogs`,
    { method: "get", credentials: "include" }
  );

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 text-center mt-20">Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl shadow-lg p-12 mb-12 text-center mx-4 md:mx-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to <span className="text-yellow-300">Blogify</span>
        </h1>
        <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
          Explore the latest blogs, trending ideas, and inspiring stories from our vibrant community.
        </p>
      </section>

      {/* Blogs Section */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
          📝 Latest Blogs
        </h2>

        {blogData?.data && blogData.data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogData.data.map((blog) => (
              <div
                key={blog._id}
                className="hover:scale-105 transition-transform duration-300"
              >
                <BlogCard props={blog} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center col-span-full mt-16">
            <p className="text-gray-500 text-lg">No blogs available yet.</p>
            <p className="text-gray-400 mt-2">Be the first one to share your thoughts!</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Index;
