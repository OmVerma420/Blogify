import { getEnv } from '@/helpers/getEnv';
import { RouteBlogDetails } from '@/helpers/routeName';
import { useFetch } from '@/hooks/useFetch';
import React from 'react';
import { Link } from 'react-router-dom';

function RelatedBlog({ categorySlug , currentBlog }) {
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/auth/blog/get-related-blog/${categorySlug}/${currentBlog}`,
    {
      method: "get",
      credentials: "include",
    },
    [categorySlug]
  );
  console.log(categorySlug)
  // console.log(data)
    console.log(currentBlog)

  if (loading) return <div className="text-center py-6 text-gray-500">Loading related blogs...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2">Related Blogs</h2>
      <div className="flex flex-col gap-4">
        {data && data?.data.length > 0 ? (
          data?.data.map((relatedBlog) => (
            <Link
              to={RouteBlogDetails(categorySlug , relatedBlog.slug)}
              key={relatedBlog._id}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex items-center"
            >
              {/* Thumbnail */}
              <div className="w-32 h-24 flex-shrink-0 overflow-hidden">
                <img
                  src={relatedBlog?.featuredImage}
                  alt={relatedBlog?.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Blog Content */}
              <div className="p-4 flex-1">
                <h4 className="font-semibold text-lg text-gray-800 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {relatedBlog?.title}
                </h4>
                {/* <p className="text-sm text-gray-500">{relatedBlog?.category}</p> */}
              </div>
            </Link>
          ))
        ) : (
          <div className="text-gray-500 text-center py-6">
            No Related Blogs Found
          </div>
        )}
      </div>
    </div>
  );
}

export default RelatedBlog;
