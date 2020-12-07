import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Redirect } from 'react-router'
import CoursePage from './CoursePage'
import Profile from './Profile'
import FutureCourses from './FutureCourses'
import PastCourses from './PastCourses'
import Navbar from './Navbar'
import Login from './Login'
import SignUp from './SignUp'
import {useUser} from './UserContext'

function ProtectedRoute(prop) {
    const user = useUser()

    const { component: Component, ...props } = prop
  
    return (
    <Route 
        {...props} 
        render={props => (
        user.length !== 0 ?
            <Component {...props} /> :
            <Redirect to='/' />
        )} 
    />
    )
}

function ReactRouter() {
    const user = useUser()

    return (
        <Router>
            { user.length !== 0 &&
                <Navbar />
            }
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/signUp" component={SignUp} />
                <ProtectedRoute path="/coursePage" component={CoursePage} />
                <ProtectedRoute path="/profile" component={Profile} />
                <ProtectedRoute path="/futureCourses" component={FutureCourses} />
                <ProtectedRoute path="/pastCourses" component={PastCourses} />
            </Switch>
        </Router>
   )
}

export default ReactRouter