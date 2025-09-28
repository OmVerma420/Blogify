export const RouteIndex = "/";
export const RouteSignIn = "/signin";
export const RouteSignUp = "/signup";
export const RouteProfile = "/profile";
export const RouteCategoryDetails = '/categories'
export const RouteAddCategory = '/category/add'
export const RouteEditCategory = "/category/edit";
export const RouteBlog ='/blog'
export const RouteAddBlog ='/blog/add'
export const RouteEditBlog ='/blog/edit'
export const RouteBlogDetails = (category, blog) => {
  return category && blog
    ? `/blog/${category}/${blog}`
    : "/blog/:category/:blog";
};
export const RouteBlogByCategory = (category) => {
  if(!category){
    return "/blog/get-category-related-blog/:category";

  }else{
    return `/blog/get-category-related-blog/${category}`

  }
};
export const RouteSearch = (q)=>{
  if (q) {
    return `/search?q=${q}`
  } else {
    return `/search`
  }
}
export const RouteComment = '/comment/get-all-comments'
export const RouteUser = '/user/get-all-user'