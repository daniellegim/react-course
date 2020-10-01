import React from 'react'
import {CartProvider} from './CartContext'
import {FutureCoursesProvider} from './FutureCoursesContext'
import ReactRouter from './router'

function App() {
  return (
    <div>
      <CartProvider>
        <FutureCoursesProvider>
          <ReactRouter />
        </FutureCoursesProvider>
      </CartProvider>
    </div>
  )
}

export default App
