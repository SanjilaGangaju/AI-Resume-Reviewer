import React from 'react'
import {Navigate, Outlet} from "react-router-dom"
const ProtectedRoute = ({loggedIn}) => {

  return (
    <>
    {loggedIn?<Outlet></Outlet>:<Navigate to="/login"></Navigate>}
    </>
  )
}

export default ProtectedRoute