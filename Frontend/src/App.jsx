import {React, useEffect, useState} from 'react'
import { Route, Routes, Navigate } from 'react-router'
import Signup from './pages/signup'
import Signin from './pages/signin'
import useAuthStore from './store/useAuthStore'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
const App = () => {

  const {authUser, checkAuth} = useAuthStore()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchAuth = async () => {
      await checkAuth()
      setLoading(false)
    }
    fetchAuth()
  }, []) 
  
  if (loading) {
    return <div>Loading...</div>
  }


  return (
    <>
    <Routes>
      <Route path="/signup" element = {<Signup/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/home' element={authUser ? <Home /> : <Navigate to="/signin" />} />
    </Routes>
    <Toaster/>
    </>
  )
}
export default App