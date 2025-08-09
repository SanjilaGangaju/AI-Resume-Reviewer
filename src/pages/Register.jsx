import React, { useState } from 'react'
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {createUserWithEmailAndPassword} from 'firebase/auth'
const Register = () => {
  const navigate= useNavigate();
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const user = await createUserWithEmailAndPassword(auth, email, password)
            console.log(user)
            navigate('/login')
          

        }
        catch(error){
           console.log(error)
        }

    }
  return (
    
    <div className='flex flex-col m-[10%] px-2 py-6 rounded-xl  border border-indigo-200 bg-white gap-4  items-center justify-center  my-6'>
        <h2 className='font-bolder text-xl text-gray-500'>SignUp</h2>
      <div className='w-[90%]'>
         <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
        <div>
           
        <input className='border p-1 w-full border-indigo-200 rounded focus:outline-indigo-400 placeholder:text-gray-400 placeholder:text-[0.7rem]' 
        value={email} required onChange={(e)=>setEmail(e.target.value)}
        type="email"  autoComplete="off" placeholder='Email'></input>
        </div>
        <div>
         
        <input className='w-full border p-1 border-indigo-200 focus:outline-indigo-400 rounded placeholder:text-gray-400 placeholder:text-[0.7rem]' 
        value={password} required onChange={(e)=>setPassword(e.target.value)}
        type="password"  autoComplete="off" placeholder='Password'/>
        </div>
       

        <button type="submit" className='bg-indigo-400 hover:bg-indigo-500   text-white rounded px-1 py-1 text-[0.8rem] '>Sign Up</button>
      </form>
      </div>
     
      <p className='text-[0.7rem] text-gray-500'>Already have an account?<Link to='/login' className='text-blue-500'> Login</Link></p>
        
      </div>
  )
}

export default Register