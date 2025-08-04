import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <>
    <div className=' px-15 py-2'>
      <nav className='flex items-center justify-between'>
        <div className='text-3xl text-center flex items-center justify-center font-bold'>Resvu AI</div>
        <div className='flex text-xl font-semibold items-center justify-between gap-6'>
        <Link className="relative after:absolute after:left-0 after:bottom-0 after:transition-all after:w-0 after:duration-300 after:ease-in-out after:h-[2px] hover:after:w-full after:bg-current"
 to="/">Home</Link>
        <Link className='hover-underline' to="/upload">Upload</Link>
        <Link className='hover-underline' to="/login">Login</Link>
        </div>
        
      </nav>
    </div>
    </>
  )
}

export default Navbar