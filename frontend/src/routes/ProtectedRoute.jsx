import React from 'react'
import { authContext } from '../context/Authcontext'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'

const ProtectedRoute = ({children, allowedRoute}) =>{
    const {token, role} = useContext(authContext)

    const isAllowed = allowedRoute.includes(role)
    const accessibleRoute = token && isAllowed ? children : <Navigate to='/login' replace={true} />;

    return accessibleRoute;
}

export default ProtectedRoute;