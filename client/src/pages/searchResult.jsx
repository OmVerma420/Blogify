import BlogCard from '@/components/ui/blogCard'
import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

function SearchResult() {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q')
  const { data: blogData, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/auth/search?q=${q}`,
    { method: "get", credentials: "include" },
    [q]
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white rounded-2xl shadow-lg p-8 mb-10">
        <h4 className="text-3xl font-extrabold text-center">
          Search Results for: <span className="italic">{q}</span>
        </h4>
        <p className="text-center text-lg mt-3 opacity-90">
          We found {blogData?.data?.length || 0} blog(s) matching your search.
        </p>
      </div>

      {/* Blogs Section */}
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
          Latest Blogs
        </h1>

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
            <p className="text-gray-500 text-lg">
              😕 No results found for <span className="font-semibold">{q}</span>.
            </p>
            <p className="text-gray-400 mt-2">
              Try searching with different keywords.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResult
