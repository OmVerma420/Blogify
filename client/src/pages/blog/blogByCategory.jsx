import BlogCard from '@/components/ui/blogCard';
import { Loading } from '@/components/ui/loading';
import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import React from 'react'
import { useParams } from 'react-router-dom';

function BlogByCategory() {
    const { category } = useParams();
  const {data: blogData,loading,error,} = useFetch(`${getEnv("VITE_API_BASE_URL")}/auth/blog/get-category-related-blog/${category}`, {
      method: "get",
      credentials: "include",
    },
    [category]
  );
    console.log(blogData)
    if (loading) return <Loading/>;
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Latest Blogs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blogData && blogData.data.length > 0 ? (
            blogData.data.map((blog) => <BlogCard key={blog._id} props={blog} />)
          ) : (
            <div className="text-center col-span-full">Data not found</div>
          )}
        </div>
      </div>
    );
}

export default BlogByCategory