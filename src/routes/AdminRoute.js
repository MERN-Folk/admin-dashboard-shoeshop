import React from 'react'
import { useSelector } from 'react-redux'
import LoadingToRedirect from '../components/LoadingToRedirect'

const AdminRoute = ({children}) => {
  const { staff } = useSelector((state) => ({ ...state.auth }));
  const role = staff?.result?.role
  const name = staff?.result?.name
  const token = staff?.token

  // console.log( name)
  return name && token && role === "admin"
    ? children
    : <LoadingToRedirect />
  
}

export default AdminRoute