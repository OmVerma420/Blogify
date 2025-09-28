import { RouteIndex, RouteSignIn } from '@/helpers/routeName'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function OnlyAdminAllowed() {
    const user = useSelector(state => state.user)
    console.log(user)
    if(user && user.status && user.userData.role === 'admin'){
        return (
          <Outlet/>
        )
    } else {
        return <Navigate to={RouteSignIn}/>
    }
}

export default OnlyAdminAllowed