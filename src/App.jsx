import React, { useState } from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Navbar from './component/Navbar'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Login from './pages/Login'

import Review from './component/Review'
import Footer from './component/Footer'
import Register from './pages/Register'
import ProtectedRoute from './component/ProtectedRoute'

const App = () => {
  const[loggedIn, setloggedIn] = useState(false);
  // const loggedIn = JSON.parse(localStorage.getItem("keepLoggedIn"))
  // console.log(loggedIn)
  return (
    <>
    <Router>
      <Navbar loggedIn={loggedIn} setloggedIn={setloggedIn}></Navbar>
      <Routes>
        <Route path='/' element={<Home loggedIn={loggedIn}></Home>}></Route>

        <Route element={<ProtectedRoute loggedIn={loggedIn}></ProtectedRoute>}>
            <Route path='/upload' element={<Upload></Upload>}></Route>
           <Route path='/review' element={<Review></Review>}></Route>
           
        </Route>
        
        <Route path='/login' element={<Login setloggedIn={setloggedIn}></Login>}></Route>
       
        <Route path='/register' element={<Register></Register>}></Route>

      </Routes>
      <Footer></Footer>

    </Router>
    </>
 
  )
}

export default App