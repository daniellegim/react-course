import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles'
import CoursePage from './CoursePage'
import Profile from './Profile'
import FutureCourses from './FutureCourses'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
})

function ReactRouter() {
    const classes = useStyles();
    const [value, setValue] = React.useState()
  
    const handleChange = (event, newValue) => {
      setValue(newValue)
    }

    return (
        <Router>
            {/* <Paper className={classes.root}> */}
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    centered
                >
                    <Tab label="Courses I've done" href="/"/>
                    <Tab label="My profile" href="/profile"/>
                    <Tab label="Future courses" href="/futureCourses"/>
                </Tabs>
            {/* </Paper> */}
            <Switch>
                <Route exact path="/" component={CoursePage} />
                <Route path="/profile" component={Profile} />
                <Route path="/futureCourses" component={FutureCourses} />
            </Switch>
        </Router>
   )
}

export default ReactRouter