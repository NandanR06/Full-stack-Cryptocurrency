import React from 'react'
import Login from './Componebts/Login'
import Register from './Componebts/Register'
import Navbar from './Componebts/Navbar'
import { Route, Routes } from 'react-router-dom';
import Protected from './Componebts/Protected.jsx'
import { AuthProvider } from './AutoCotext.jsx';
import Footer from './Componebts/Footer.jsx';
import CoinInfo from './Componebts/CoinInfo.jsx';

export default function App() {
  return (
    <div>
       <AuthProvider>
      <Navbar />
        <Routes>
          <Route path="/Login" element={<Protected> <Protected/></Protected>} />
          <Route path='/' element={<Login/>} />
          <Route path='/Register' element={<Register />} />
          <Route path='/coin/:id' element={<CoinInfo/>}/>
        </Routes>
      </AuthProvider>
    </div>
  )
}
