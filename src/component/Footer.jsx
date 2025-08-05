import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <>
    <footer className='bg-gray-100 px-10 py-2'>
      <div>
        <div className='flex flex-col text-s font-semibold items- justify-between gap-2 '>
        <Link className=" text-gray-600" to="/">Home</Link>
        <Link className='text-gray-600' to="/upload">Upload</Link>
        <Link className='text-gray-600' to="/login">Login</Link>
        </div>
      </div>
      <div className='mx-70 text-s text-gray-400'>Made with ❤️ By Sanjila Gangaju</div>
      
       
    </footer>
    </>
  )
}

export default Footer