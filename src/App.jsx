import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Navbar from './component/Navbar'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Login from './pages/Login'

import Review from './component/Review'
import Footer from './component/Footer'
import Register from './pages/Register'
import ProtectedRoute from './component/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useAuthState} from 'react-firebase-hooks/auth'
const App = () => {
  const [user] = useAuthState(auth)
  const [dbloading, setdbloading] = useState(false);
  const[loggedIn, setloggedIn] = useState(()=>{
    return JSON.parse(localStorage.getItem("keepLoggedIn")) || false;
  })
   
  useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, (user)=>{
        if(user){
          setloggedIn(true);
          localStorage.setItem("keepLoggedIn", JSON.stringify(true));
          

        }
        else{
          setloggedIn(false);
          localStorage.removeItem("keepLoggedIn");
        }
      })
      return ()=> unsubscribe();
  },[])


  // console.log(loggedIn)
  return (
    <>
    <Router>
      <Navbar loggedIn={loggedIn} setloggedIn={setloggedIn}></Navbar>
      <Routes>
        <Route path='/' element={<Home loggedIn={loggedIn}></Home>}></Route>

        <Route element={<ProtectedRoute loggedIn={loggedIn}></ProtectedRoute>}>
            <Route path='/upload' element={<Upload currentUser={user} dbloading={dbloading} setdbloading={setdbloading}></Upload>}></Route>
           <Route path='/review' element={<Review></Review>}></Route>
           
        </Route>
        
        <Route path='/login' element={<Login setloggedIn={setloggedIn}></Login>}></Route>
       
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='dashboard' element = {<Dashboard dbloading={dbloading} setdbloading={setdbloading} currentUser={user}></Dashboard>}></Route>

      </Routes>
      <Footer loggedIn={loggedIn}></Footer>

    </Router>
    </>
 
  )
}

export default App