import React from 'react'
import {CartProvider} from './CartContext'
import {SoldierCoursesProvider} from './SoldierCoursesContext'
import {UserProvider} from './UserContext'
import ReactRouter from './router'
import { AppInsightsContext } from "@microsoft/applicationinsights-react-js"
import { reactPlugin } from "./appInsights/appInsights"

function App() {
  return (
    <AppInsightsContext.Provider value={reactPlugin}>
      <UserProvider>
        <CartProvider>
          <SoldierCoursesProvider>
            <ReactRouter />
          </SoldierCoursesProvider>
        </CartProvider>
      </UserProvider>
    </AppInsightsContext.Provider>
  )
}

export default App
