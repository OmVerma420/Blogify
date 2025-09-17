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

