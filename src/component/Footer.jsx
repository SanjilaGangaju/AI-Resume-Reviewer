import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <>
    <footer className='bg-gray-100 px-8 py-3'>
      <div className='grid grid-cols-3 gap-8'>
         <div className='flex flex-col items-start  justify-center '><span className='text-indigo-300 text-xl '>AIResvue</span>
         <p className='text-[0.7rem] text-gray-400'> Smart resume feedback powered by AI. Improve your job chances with real-time insights.</p>
         </div>
      
       <div className='flex text-[0.8rem] gap-6 items-center font-semibold  mb-2'>
        
        <Link className=" text-gray-500 text-[0.9rem]" to="/">Home</Link>
        <Link className='text-gray-500 text-[0.9rem]' to="/upload">Upload</Link>
        <Link className='text-gray-500 text-[0.9rem]' to="/login">Login</Link>
        </div>
       <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-2">Connect</h3>
          <div className="flex space-x-4 mb-2">
            <a href="#" title="LinkedIn" className="hover:text-white">🔗</a>
            <a href="#" title="Twitter" className="hover:text-white">🐦</a>
            <a href="#" title="GitHub" className="hover:text-white">💻</a>
          </div>
          
          <p className="text-xs text-gray-500">© 2025 ResumeAI. All rights reserved.</p>
          <div className='text-[0.6rem] mt-2 text-gray-400'>Made with ❤️ By Sanjila Gangaju</div>
        </div>
      </div>
     
      
      
       
    </footer>
    </>
  )
}

export default Footer