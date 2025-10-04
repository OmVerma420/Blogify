import React from 'react'
import { BrowserRouter, Routes ,Route } from 'react-router-dom'
import { RouteIndex, RouteProfile, RouteSignIn, RouteSignUp, RouteCategoryDetails, RouteAddCategory, RouteEditCategory, RouteBlog, RouteAddBlog, RouteEditBlog, RouteBlogDetails, RouteBlogByCategory, RouteSearch, RouteComment, RouteUser } from './helpers/RouteNames.js'
import Index from './pages/Index.jsx'
import Layout from './Layout/Layout.jsx'
import AuthLayout from './Layout/AuthLayout.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Profile from './pages/profile.jsx'
import CategoryDetails from './pages/category/categoryDetails.jsx'
import AddCategory from './pages/category/addCategory.jsx'
import EditCategory from './pages/category/editCategory.jsx'
import AddBlog from './pages/blog/addBlog.jsx'
import { BlogDetails } from './pages/blog/blogDetail.jsx'
import EditBlog from './pages/blog/editBlog.jsx'
import BlogPage from './pages/blogPage.jsx'
import BlogByCategory from './pages/blog/blogByCategory.jsx'
import SearchResult from './pages/searchResult.jsx'
import Comment from './pages/commentDetail.jsx'
import Users from './pages/users.jsx'
import AuthRouteProtection from './components/ui/authRouteProtection.jsx'
import OnlyAdminAllowed from './components/ui/onlyAdminAllowed.jsx'
import GoogleAuthHandler from './components/ui/GoogleAuthHandler.jsx'

function App() {
  return (
      <BrowserRouter>
        <GoogleAuthHandler />
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