import React from 'react'
import { BrowserRouter, Routes ,Route } from 'react-router-dom'
import { RouteIndex, RouteProfile, RouteSignIn, RouteSignUp, RouteCategoryDetails, RouteAddCategory, RouteEditCategory } from './helpers/routeName'
import Index from './pages'
import Layout from './Layout/layout'
import AuthLayout from './Layout/authLayout'
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import Profile from './pages/profile.jsx'
import CategoryDetails from './pages/category/categoryDetails.jsx'
import AddCategory from './pages/category/addCategory.jsx'
import EditCategory from './pages/category/editCategory.jsx'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path={RouteIndex} element={<Layout />}>
            <Route index element={<Index />} />
            <Route path={RouteProfile} element={<Profile />}/>
            <Route path={RouteCategoryDetails} element={<CategoryDetails />}/>
            <Route path={RouteAddCategory} element={<AddCategory />}/>
            <Route path={RouteEditCategory} element={<EditCategory />}/>
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