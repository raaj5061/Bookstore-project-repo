import React from 'react'

import { Outlet } from 'react-router'
import '../styles/RootLayout.css'
import Navbar from './Navbar'
import Footer from './Footer'
function RootLayout() {
  return (
    <div className='Outt'>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default RootLayout