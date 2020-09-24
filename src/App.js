import React from 'react'
import Navbar from './Navbar'
import CoursePage from './CoursePage'
//import {CoursesProvider} from './CoursesContext'

function App() {
  return (
    <div>
      {/* <CoursesProvider> */}
        <Navbar />
        <CoursePage />
      {/* </CoursesProvider> */}
    </div>
  )
}

export default App
