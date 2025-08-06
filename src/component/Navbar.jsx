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
    <div className='relative px-10 bg-gray-50 py-6'>
      <nav className=' flex items-center  justify-between'>
        <div className='text-2xl text-center flex items-center text-indigo-500 justify-center font-bold'>AiResvue</div>
        
        <div className='hidden md:flex text-[1.3rem] text-gray-300 font-semibold items- justify-between gap-6 '>
        <Link className="relative text-gray-400 after:absolute after:left-0 after:bottom-0 after:transition-all after:w-0 after:duration-300 after:ease-in-out after:h-[2px] hover:after:w-full after:bg-indigo-400"
 to="/">Home</Link>
        <Link className='hover-underline text-gray-400' to="/upload">Upload</Link>
        <Link className='hover-underline text-gray-400' to="/login">Login</Link>
        </div>
        {hamOn&&
          <div className='md:hidden absolute right-0 top-10  bg-white w-full py-4 flex flex-col items-end pr-10 text-[0.8rem] font-semibold  gap-2'>
          <button onClick={handleNav} className='text-indigo-400 text-[1.2rem]'><IoIosClose /></button>
        <Link className="relative after:absolute after:left-0 text-gray-600 after:bottom-0 after:transition-all after:w-0 after:duration-300 after:ease-in-out after:h-[2px] hover:after:w-full after:bg-current"
 to="/">Home</Link>
        <Link className='hover-underline text-gray-600 ' to="/upload">Upload</Link>
        <Link className='hover-underline text-gray-600' to="/login">Login</Link>
        </div>}
  
         <button onClick={handleNav} className='md:hidden'>
          <RxHamburgerMenu className='md:hidden text-2xl font-bolder text-indigo-700 text-black'/>
        </button>
       
      </nav>
      
    </div>
   
    </>
  )
}

export default Navbar