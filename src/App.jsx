import React from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Navbar from './component/Navbar'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Login from './pages/Login'
const App = () => {
  return (
    <>
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/upload' element={<Upload></Upload>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
      </Routes>

    </Router>
    </>
 
  )
}

export default App