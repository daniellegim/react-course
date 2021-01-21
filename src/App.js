import React from 'react'
import {CartProvider} from './CartContext'
import {SoldierCoursesProvider} from './SoldierCoursesContext'
import {UserProvider} from './UserContext'
import ReactRouter from './router'

function App() {
  return (
      <UserProvider>
        <CartProvider>
          <SoldierCoursesProvider>
            <ReactRouter />
          </SoldierCoursesProvider>
        </CartProvider>
      </UserProvider>
  )
}

export default App
