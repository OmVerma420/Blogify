import BlogCard from '@/components/ui/blogCard';
import { Loading } from '@/components/ui/loading';
import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import React from 'react'
import { useParams } from 'react-router-dom';
import { BiCategoryAlt } from "react-icons/bi";


function BlogByCategory() {
  const { category } = useParams();
  const { data: blogData, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/auth/blog/get-category-related-blog/${category}`,
    { method: "get", credentials: "include" },
    [category]
  );

  if (loading) return <Loading />;

  return (
    <>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white rounded-2xl shadow-lg p-8 mb-10">
        <div className="flex items-center justify-center gap-3 text-3xl font-extrabold">
          <BiCategoryAlt className="text-4xl" />
          <h4>
            {blogData?.data?.categoryData?.name || "Category"}
          </h4>
        </div>
        <p className="text-center text-lg mt-3 opacity-90">
          Explore the latest blogs curated under <span className="font-semibold">{category}</span>.
        </p>
      </div>

      {/* Blogs Section */}
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
          Latest Blogs
        </h1>

        {blogData?.data?.blog && blogData.data.blog.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogData.data.blog.map((blog) => (
              <div
                key={blog._id}
                className="hover:scale-105 transition-transform duration-300"
              >
                <BlogCard props={blog} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center col-span-full text-gray-500 text-lg">
            🚫 No blogs found in this category.
          </div>
        )}
      </div>
    </>
  );
}

export default BlogByCategory;
