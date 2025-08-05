import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosClose } from "react-icons/io";
const Navbar = () => {
  const [hamOn, setHamOn]=useState(false)
  const handleNav=()=>{
    setHamOn(!hamOn);

  }
  return (
    <>
    <div className='relative px-10 py-2'>
      <nav className=' flex items-center justify-between'>
        <div className='text-3xl text-center flex items-center justify-center font-bold'>Resvu AI</div>
        
        <div className='hidden flex text-xl font-semibold items- justify-between gap-6'>
        <Link className="relative after:absolute after:left-0 after:bottom-0 after:transition-all after:w-0 after:duration-300 after:ease-in-out after:h-[2px] hover:after:w-full after:bg-current"
 to="/">Home</Link>
        <Link className='hover-underline' to="/upload">Upload</Link>
        <Link className='hover-underline' to="/login">Login</Link>
        </div>
        {hamOn&&
          <div className='absolute right-0 top-10 bg-white w-full py-4 flex flex-col items-end pr-10 text-[1.1rem] font-semibold  gap-2'>
          <button onClick={handleNav}><IoIosClose /></button>
        <Link className="relative after:absolute after:left-0 after:bottom-0 after:transition-all after:w-0 after:duration-300 after:ease-in-out after:h-[2px] hover:after:w-full after:bg-current"
 to="/">Home</Link>
        <Link className='hover-underline ' to="/upload">Upload</Link>
        <Link className='hover-underline' to="/login">Login</Link>
        </div>}
  
        
        <button onClick={handleNav}>
          <RxHamburgerMenu className='text-2xl font-bolder text-black'/>
        </button>
      </nav>
    </div>
   
    </>
  )
}

export default Navbar