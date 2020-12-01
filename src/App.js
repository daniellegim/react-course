import React from 'react'
import {CartProvider} from './CartContext'
import {SoldierCoursesProvider} from './SoldierCoursesContext'
import ReactRouter from './router'

function App() {
  return (
    <div>
      <CartProvider>
        <SoldierCoursesProvider>
          <ReactRouter />
        </SoldierCoursesProvider>
      </CartProvider>
    </div>
  )
}

export default App
