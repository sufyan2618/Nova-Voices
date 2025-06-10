import React from 'react'
import useAuthStore from '../store/useAuthStore'

const Home = () => {
  const { authUser } = useAuthStore()

  return (
    <div className='min-h-screen bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center p-4 font-sans text-white'>
      <div className='bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-8 max-w-2xl w-full shadow-lg hover:scale-105 transition-transform duration-300'>
        <h1 className='text-3xl text-black font-semibold mb-4 text-center'>Welcome, {authUser.name}!</h1>
        <div className='flex flex-col md:flex-row items-center md:items-start'>
          <img
            src={authUser.assistantImage}
            alt={`${authUser.assistantName} Image`}
            className='w-48 h-48 object-cover rounded-full shadow-lg mb-4 md:mb-0 md:mr-6'
          />
          <div className='text-center md:text-left'>
            <h2 className='text-xl text-black font-semibold mb-2'>Your Assistant: {authUser.assistantName}</h2>
            <p className='mb-2 text-black'>Email: {authUser.email}</p>
            {/* Add any other info you'd like to display */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home