import React from 'react'
import { useSelector } from 'react-redux'
import LoadingToRedirect from '../components/LoadingToRedirect'

const SkwRoute = ({children}) => {
  const { staff } = useSelector((state) => ({ ...state.auth }));
  const role = staff?.result?.role
  const name = staff?.result?.name
  const token = staff?.token

  return name && token && (role === "skw" || role === "admin")
    ? children
    : <LoadingToRedirect />
  
}

export default SkwRoute