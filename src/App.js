import React from 'react'
import Navbar from './Navbar'
import {CartProvider} from './CartContext'
import {FutureCoursesProvider} from './FutureCoursesContext'
import ReactRouter from './router'

function App() {
  return (
    <div>
      <CartProvider>
        <FutureCoursesProvider>
          <Navbar />
          <ReactRouter />
        </FutureCoursesProvider>
      </CartProvider>
    </div>
  )
}

export default App
