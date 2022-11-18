import React from 'react'
import { useSelector } from 'react-redux'
import LoadingToRedirect from '../components/LoadingToRedirect'

const StaffRoute = ({children}) => {
  const { staff } = useSelector((state) => ({ ...state.auth }));
  const name = staff?.result?.name
  const token = staff?.token
  
  return name && token
    ? children
    : <LoadingToRedirect />
  
}

export default StaffRoute