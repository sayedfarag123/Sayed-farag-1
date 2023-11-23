import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { user } = useSelector(s => s.Auth)
  const navigate = useNavigate()


  // useEffect(() => {
  //   user?.role == 'مشرف'&&navigate('/dashboard/dashboard')
  // }, [user])


  return (
    <div>Home</div>
  )
}

export default Home