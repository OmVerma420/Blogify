import React from 'react'
import { BrowserRouter, Routes ,Route } from 'react-router-dom'
import { RouteIndex, RouteProfile, RouteSignIn, RouteSignUp } from './helpers/routeName'
import Index from './pages'
import Layout from './Layout/layout'
import AuthLayout from './Layout/authLayout'
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import Profile from './pages/profile.jsx'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path={RouteIndex} element={<Layout />}>
            <Route index element={<Index />} />
          </Route>
          <Route path={RouteProfile} element={<Layout />}>
            <Route index element={<Profile/>} />
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