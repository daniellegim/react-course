import React from 'react'
import Navbar from './Navbar'
import CoursePage from './CoursePage'
import {ThemeProvider} from './ThemeContext'

function App() {
  return (
    <div>
      <ThemeProvider>
        <Navbar />
        <CoursePage />
      </ThemeProvider>
    </div>
  )
}

export default App
