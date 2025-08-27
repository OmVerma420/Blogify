import React from 'react';
import { CategoriesData } from "../../constants/categoriesData.js";
import { Link, useSearchParams } from "react-router-dom";

export const Categories = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category')

  return (
    <div className="w-[90%] mx-auto my-5">
      <Link to={`/create?category=${category || ""}`}>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create Blog
        </button>
      </Link>

      <div className="mt-5 border border-gray-300 rounded">
        <div className="bg-blue-600 text-white font-bold text-lg px-4 py-2">
          <Link to='/' className="no-underline text-inherit">
            All Category
          </Link>
        </div>
        
        <div className="divide-y divide-gray-200">
          {CategoriesData.map(category => (
            <div key={category.id} className="hover:bg-gray-100 transition-colors">
              <div className="px-4 py-3 text-base font-medium">
                <Link 
                  to={`/?category=${category.name}`} 
                  className="no-underline text-inherit hover:text-blue-600"
                >
                  {category.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
