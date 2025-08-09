import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../firebase'; // your firebase config
const Navbar = ({loggedIn, setloggedIn}) => {
  
  const [hamOn, setHamOn]=useState(false)
 
  const handleNav=()=>{
    setHamOn(!hamOn);

  }
  const navigate = useNavigate();
  const logout=async()=>{
    try{
      await signOut(auth);
      setloggedIn(false);
      localStorage.removeItem("keepLoggedIn");
     navigate('/');
    }
    catch (error){
      console.log(error)
    }
    

   
    
    
    
  }
  return (
    <>
    <div className='relative px-4 bg-blue-50 py-6'>
      <nav className=' flex items-center  justify-between'>
        <div className='text-2xl text-center flex items-center text-indigo-500 justify-center font-bold'><Link to='/'>AiResvue</Link></div>
        
        <div className='hidden md:flex text-[1.3rem] text-gray-300 font-semibold items- justify-between gap-6 '>

        {loggedIn? 
        <>
        
        <Link className="relative text-gray-600 after:absolute after:left-0 after:bottom-0 after:transition-all after:w-0 after:duration-300 after:ease-in-out after:h-[2px] hover:after:w-full after:bg-indigo-400"
 to="/">Home</Link>
  <Link className='hover-underline text-gray-600' to="/upload">Upload</Link>

    <button onClick={logout} className='text-gray-600'>Logout</button>
    </>
       :<>  
        <Link className="relative text-gray-600 after:absolute after:left-0 after:bottom-0 after:transition-all after:w-0 after:duration-300 after:ease-in-out after:h-[2px] hover:after:w-full after:bg-indigo-400"
 to="/">Home</Link>
       <Link className='hover-underline text-gray-600' to="/login">Login</Link>
        </>
      }
        </div>
        {hamOn&&
          <div className='md:hidden absolute right-0 top-15 h-50 bg-white w-full py-1 flex flex-col justify-center items-end pr-5 text-[0.9rem] font-semibold  gap-5'>
          <button onClick={handleNav} className='text-indigo-400 text-[1.5rem]'><IoIosClose /></button>
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