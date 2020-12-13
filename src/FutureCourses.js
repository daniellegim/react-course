import React from 'react'
import {useSoldierCourses} from './SoldierCoursesContext'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import Tooltip from '@material-ui/core/Tooltip'
import { format } from "date-fns"
import Calendar from './Calendar'

const useStyles = makeStyles((theme) => ({
    root: {
        width: "40%"
    },
    title: {
        margin: theme.spacing(2),
        marginBottom: "3%"
    },
}))

function FutureCourses() {
    const classes = useStyles()

    const soldierCourses = useSoldierCourses()

    const today = new Date()
    const courses = soldierCourses.map(course => ({
        ...course,
        dates: course.dates.map(date => (
            new Date(date.substring(0, 10))
        ))
    }))

    const future = courses.filter(course => course.dates[0] >= today)
                          .sort((a, b) => a.dates[0] > b.dates[0] ? 1 : -1)

    const futureCourses = future.map(course => ({
        ...course,
        dates: format(course.dates[0], "dd.MM.yyyy")
    }))

    return(
        <div>
            <Calendar />
            <Typography className={classes.title} variant="h4" component="h2" align="center" color="textSecondary">
                Future courses
            </Typography>
            { futureCourses.length === 0 && 
                <Typography variant="h5" component="h2" align="center">
                    You didn't sign up for courses yet :(
                </Typography>
            }
            { futureCourses.map(course => 
                <Box display="flex" justifyContent="center" key={course._id}>
                    <Card className={classes.root} variant="outlined">
                        <CardContent>
                            <Box display="flex">
                                <Box flexGrow={1}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {course.name}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Tooltip title={course.description}>
                                        <IconButton>
                                            <InfoOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>
                            <Typography color="textSecondary">
                                {course.dates}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            )}
        </div>
    )
}

export default FutureCourses