import React, {Component} from 'react'
import Navbar from "./Navbar"
import Header from "./Header"
import Course from "./Course"

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Header />
        <Course />
      </div>
    )
  }
}

export default App
