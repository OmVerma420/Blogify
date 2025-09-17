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
import { AiOutlineLike } from "react-icons/ai";
import LikeCount from '@/components/ui/likeCount';
import RelatedBlog from '@/components/ui/relatedBlog';



function BlogPage() {
  const { category, blog } = useParams();
  
  console.log("BlogPage params:", category, blog);

  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/auth/blog/get-blog/${blog}`,
    {
      method: "get",
      credentials: "include",
    }
  );

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10 p-5">
      {/* Left - Blog Content */}
      {data && (
        <div className="lg:w-[70%] bg-white border rounded-xl shadow-sm p-6">
          {/* Title */}
          <h1 className="text-4xl font-extrabold mb-2 text-gray-900 leading-snug">
            {data?.data.title}
          </h1>

          {/* Author + Date */}
          <div className="flex items-center justify-between pb-4 mb-2">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 rounded-full border">
                <AvatarImage src={data?.data.author.avatar} />
              </Avatar>
              <div>
                <p className="font-semibold text-gray-800">
                  {data?.data.author.name}
                </p>
                <p className="text-sm text-gray-500">
                  {moment(data?.data.createdAt).format('DD-MM-YYYY')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LikeCount blogId={data.data._id} />
            </div>
            <span className="text-sm px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full">
              {data?.data.category.name}
            </span>
          </div>

          {/* Featured Image */}
          <div className="mb-6">
            <img
              src={data.data.featuredImage}
              alt={data?.data.title}
              className="w-full max-h-[450px] object-cover rounded-xl shadow-md"
            />
          </div>

          {/* Blog Content */}
          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: decode(data.data.blogContent) || "",
            }}
          />

          {/* Comment Section */}
          <div className="border-t mt-10 pt-6">
            <Comment blogId={data.data._id} />
          </div>
          
        </div>
      )}

      {/* Right - Sidebar */}
      <div className="lg:w-[30%] space-y-5">
        <div className="bg-white border rounded-xl shadow-sm p-5">
          {data && <RelatedBlog categorySlug={data.data.category.slug} />}

        </div>


      </div>
    </div>
  );
}

export default BlogPage;
