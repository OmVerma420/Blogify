import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import React from 'react'
import { Link } from 'react-router-dom';

function RelatedBlog({categorySlug}) {
    const { data, loading, error } = useFetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/blog/get-related-blog/${categorySlug}`,
        {
          method: "get",
          credentials: "include",
        }
    );
    console.log(data)
    if(loading) return <div>Loading...</div>
    if(error) return <div>Error: {error.message}</div>

  return (
    <div>
        <h2 className='text-2xl font-bold'>Related Blogs</h2>
        <div>
          {data && data?.data.length > 0
            ?
            data?.data.map((relatedBlog)=>(

              <Link 
              to={`/blog/${relatedBlog.category}/${relatedBlog.slug}`}
              key={relatedBlog._id} 
              className='flex items-center gap-2'>
               <img src={relatedBlog?.featuredImage} />
               <h4 className=''>{relatedBlog?.title}</h4>
            </Link>
            )) : (

              
              <div>
              No Related Blog
            </div>
            )
          }
        </div>
    </div>
  )
}

export default RelatedBlog