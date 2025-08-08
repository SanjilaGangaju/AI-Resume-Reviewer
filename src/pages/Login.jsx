import React, { useState } from 'react'

import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {signInWithEmailAndPassword, browserLocalPersistence, setPersistence} from 'firebase/auth'
const Login = ({setloggedIn}) => {
  const navigate= useNavigate();
   const[email, setEmail] = useState("");
      const[password, setPassword] = useState("");
  
      const handleSubmit = async(e)=>{
          e.preventDefault();
          try{
              await setPersistence(auth, browserLocalPersistence)
              await signInWithEmailAndPassword(auth, email, password)
              console.log("Login Successful")
              setloggedIn(true);
             
              navigate('/')
  
          }
          catch(error){
             console.log(error)
          }
  
      }
  return (
    
      <div className='flex flex-col m-auto px-2 py-6 rounded-xl border border-indigo-200 w-80  gap-4  items-center justify-center  my-6'>
        <h2 className='font-bolder text-2xl text-gray-600'>Login</h2>
      <div className='w-[90%]'>
         <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
        <div>
          
        <input className='border p-1 w-full border-indigo-200 rounded focus:outline-indigo-400 placeholder:text-gray-400 placeholder:text-[0.6rem]' 
        value={email} required onChange={(e)=>setEmail(e.target.value)}
        type="email"  autoComplete="off" placeholder='Email'></input>
        </div>
        <div>
         
        <input className='w-full border p-1 border-indigo-200 rounded focus:outline-indigo-400 placeholder:text-gray-400 placeholder:text-[0.7rem]'  
        value={password} required onChange={(e)=>setPassword(e.target.value)}
        type="password"  autoComplete="off" placeholder="Password"/>
        </div>
       

        <button type="submit"  className='bg-indigo-400 hover:bg-indigo-500   text-white rounded px-1 py-1 text-[0.8rem]'>Login</button>
      </form>
      </div>
     
      <p className='text-[0.7rem] text-gray-500'>Don't have an account?<Link to='/register' className='text-blue-400'> Register</Link></p>
        
      </div>
    
  )
}

export default Login