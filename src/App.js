import React from 'react'
import Navbar from './Navbar'
import CoursePage from './CoursePage'
//import {CartProvider} from './CartContext'

function App() {
  return (
    <div>
      {/* <CartProvider> */}
        <Navbar />
        <CoursePage />
      {/* </CartProvider> */}
    </div>
  )
}

export default App
