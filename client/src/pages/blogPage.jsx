import Comment from '@/components/ui/comment';
import CommentList from '@/components/ui/commentList';
import { Loading } from '@/components/ui/loading';
import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { decode } from 'entities';
import React from 'react';
import { useParams } from 'react-router-dom';
import moment from "moment";
import LikeCount from '@/components/ui/likeCount';
import RelatedBlog from '@/components/ui/relatedBlog';

function stripHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

function BlogPage() {
  const { category, blog } = useParams();

  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/auth/blog/get-blog/${blog}`,
    {
      method: "get",
      credentials: "include",
    },
    [blog, category]
  );

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10 p-6 lg:p-10 bg-gray-50 min-h-screen">
      {/* Left - Blog Content */}
      {data && (
        <article className="lg:w-[70%] bg-white border rounded-2xl shadow-md p-8 transition hover:shadow-lg">
          {/* Title */}
          <h1 className="text-4xl font-extrabold mb-3 text-gray-900 leading-tight">
            {data?.data.title}
          </h1>

          {/* Author + Date + Category */}
          <div className="flex flex-wrap items-center justify-between border-b pb-4 mb-6">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 rounded-full border shadow-sm">
                <AvatarImage src={data?.data.author.avatar} />
              </Avatar>
              <div>
                <p className="font-semibold text-gray-800">
                  {data?.data.author.name}
                </p>
                <p className="text-sm text-gray-500">
                  {moment(data?.data.createdAt).format("DD MMM YYYY")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <LikeCount blogId={data?.data._id} />
              <span className="text-xs px-3 py-1 bg-indigo-100 text-indigo-600 font-medium rounded-full shadow-sm">
                {data?.data.category.name}
              </span>
            </div>
          </div>

          {/* Featured Image */}
          {data?.data.featuredImage && (
            <div className="mb-8">
              <img
                 src={data?.data.featuredImage}
                 alt={data?.data.title}
                 className="w-full h-[400px] object-cover                rounded-xl shadow"
               />

            </div>
          )}

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            {stripHtml(decode(data?.data.blogContent) || "")}
          </div>

          {/* Comment Section */}
          <div className="mt-12 border-t ">

            <Comment blogId={data?.data._id} />
          </div>
        </article>
      )}

      {/* Right - Sidebar */}
      <aside className="lg:w-[30%] space-y-6">
        <div className="sticky top-24 bg-white border rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📌 Related Blogs</h3>
          {data && (
            <RelatedBlog categorySlug={category} currentBlog={blog} />
          )}
        </div>
      </aside>
    </div>
  );
}

export default BlogPage;
