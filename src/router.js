import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import CoursePage from './CoursePage'
import Profile from './Profile'
import FutureCourses from './FutureCourses'
import Navbar from './Navbar'

function ReactRouter() {

    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/" component={CoursePage} />
                <Route path="/profile" component={Profile} />
                <Route path="/futureCourses" component={FutureCourses} />
            </Switch>
        </Router>
   )
}

export default ReactRouter