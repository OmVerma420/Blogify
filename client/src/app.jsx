import React from 'react'
import { BrowserRouter, Routes ,Route } from 'react-router-dom'
import { RouteIndex, RouteProfile, RouteSignIn, RouteSignUp, RouteCategoryDetails, RouteAddCategory, RouteEditCategory, RouteBlog, RouteAddBlog, RouteEditBlog, RouteBlogDetails, RouteBlogByCategory, RouteSearch, RouteComment, RouteUser } from './helpers/routeName'
import Index from './pages'
import Layout from './Layout/layout'
import AuthLayout from './Layout/authLayout'
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import Profile from './pages/profile.jsx'
import CategoryDetails from './pages/category/categoryDetails.jsx'
import AddCategory from './pages/category/addCategory.jsx'
import EditCategory from './pages/category/editCategory.jsx'
import AddBlog from './pages/blog/addBlog'
import { BlogDetails } from './pages/blog/blogDetail'
import EditBlog from './pages/blog/editBlog'
import BlogPage from './pages/blogPage'
import BlogByCategory from './pages/blog/blogByCategory'
import SearchResult from './pages/searchResult'
import Comment from './pages/commentDetail.jsx'
import Users from './pages/users'
import AuthRouteProtection from './components/ui/authRouteProtection'
import OnlyAdminAllowed from './components/ui/onlyAdminAllowed'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path={RouteIndex} element={<Layout />}>
            <Route index element={<Index />} />
            
            <Route path={RouteBlogDetails()} element={<BlogPage />} />
            <Route path={RouteBlogByCategory()} element={<BlogByCategory/>}/>
            <Route path={RouteSearch()} element={<SearchResult/>}/>


            <Route element={<AuthRouteProtection/>}>
            <Route path={RouteBlog} element={<BlogDetails/>}/>
            <Route path={RouteAddBlog} element={<AddBlog />}/>
            <Route path={RouteEditBlog} element={<EditBlog/>}/>
            <Route path={RouteComment} element={<Comment/>}/>
            <Route path={RouteProfile} element={<Profile />}/>
            </Route>

            <Route element={<OnlyAdminAllowed/>}>
            <Route path={RouteCategoryDetails} element={<CategoryDetails />}/>
            <Route path={RouteAddCategory} element={<AddCategory />}/>
            <Route path={RouteEditCategory} element={<EditCategory />}/>
            <Route path={RouteUser} element={<Users/>}/>
            </Route>


            {/* blog */}

          </Route>


          

          <Route path={RouteSignIn} element={<AuthLayout />}>
            <Route index element={<SignIn/>}/>
          </Route>
          <Route path={RouteSignUp} element={<AuthLayout />}>
            <Route index element={<SignUp/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App