import React, {Component} from "react"
import Header from "./Header"
import Course from "./Course"
import CoursesServer from './server/CoursesServer'
import { format } from "date-fns"
import Typography from '@material-ui/core/Typography'
import Cart from './Cart'
import Grid from '@material-ui/core/Grid'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

class CoursePage extends Component {
    constructor() {
        super()
        this.state = {
            courses: [],
            filteredCourses: [],
            errorMessage: "",
            courseName: "",
            selectedDate: new Date(),
            openSnackbar: false
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.filterCourses = this.filterCourses.bind(this)
        this.handleAddClick = this.handleAddClick.bind(this)
        this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this)
    }

    async componentDidMount() {
        const data = await CoursesServer.getAllCourses()

        // format dates
        if (Array.isArray(data)) {
            const courses = data.map(course => ({
                ...course,
                dates: course.dates.map(date => (
                    format(new Date(date.substring(0, 10)), "dd.MM.yyyy")
                ))
            }))
            this.setState({courses: courses, filteredCourses: courses})
        } else {
            this.setState({errorMessage: "Failed to load courses"})
        }
    }

    handleInputChange(event) {
        this.setState({courseName: event.target.value}, this.filterCourses)
    }

    handleDateChange(date) {
        this.setState({selectedDate: date}, this.filterCourses)
    }

    filterCourses() {
        const courseName = this.state.courseName
        const date = this.state.selectedDate

        if (courseName === "") {
            this.setState({filteredCourses: this.state.courses})
        } else {
            const formattedDate = format(date, "dd.MM.yyyy")
            const filtered = this.state.courses.filter(course => 
                (course.name.toLowerCase().includes(courseName.toLowerCase())) &&
                (course.dates.includes(formattedDate)))

            this.setState({filteredCourses: filtered})
        }
    }

    async handleAddClick() {
        const courseName = this.state.courseName
        const selectedDate = this.state.selectedDate
        let courseDates = []

        const formattedDate = format(selectedDate, "dd.MM.yyyy")
        
        const filtered = this.state.courses.filter(course => 
            course.name.toLowerCase() === courseName.toLowerCase())

        if (filtered.length !== 0) {

            // Add date to course in DB
            const updatedCourse = await CoursesServer.updateCourse(selectedDate, filtered[0]._id)

            // If it didn't save
            if (typeof updatedCourse === 'string') {
                this.setState({ openSnackbar: true })
            } else {
                filtered[0].dates.push(formattedDate)

                const newCourses = this.state.courses.map(course => 
                    course.name.toLowerCase() === courseName ? filtered[0] : course)
                
                this.setState({
                    courses: newCourses,
                    filteredCourses: newCourses
                }, this.filterCourses)
            } 
        } else {
            courseDates.push(selectedDate)

            let newCourse = {
                name: courseName,
                dates: courseDates,
                gmush: "50",
                description: courseName
            }

            // Save new course to DB
            const courseAdded = await CoursesServer.addNewCourse(newCourse)

            // If it didn't save
            if (typeof courseAdded === 'string') {
                this.setState({ openSnackbar: true })
            } else {
                courseDates = []
                courseDates.push(formattedDate)
                newCourse.dates = courseDates

                this.setState({
                    courses: this.state.courses.concat(newCourse),
                    filteredCourses: this.state.courses.concat(newCourse),
                }, this.filterCourses)
            }            
        }
    }

    handleCloseSnackbar (event, reason) {
        if (reason === 'clickaway') {
          return
        }
    
        this.setState({ openSnackbar: false })
      }

    render() {
        return(
            <div>    
                <Header courses={this.state.filteredCourses}
                        courseName={this.state.courseName} 
                        selectedDate={this.state.selectedDate} 
                        handleInputChange={this.handleInputChange} 
                        handleDateChange={this.handleDateChange}
                        handleAddClick={this.handleAddClick}
                />
               <Grid container>
                    <Grid item >
                        <Cart />
                    </Grid>
                    <Grid item xs={11}>
                        <Course courses={this.state.filteredCourses}/>
                    </Grid>
                </Grid>
                <Snackbar open={this.state.openSnackbar} autoHideDuration={3000} onClose={this.handleCloseSnackbar}>
                    <MuiAlert onClose={this.handleCloseSnackbar} severity="error" elevation={6} variant="filled">
                        Failed to add course
                    </MuiAlert>
                </Snackbar>
                {this.state.errorMessage !== "" && 
                    <Typography variant="h4" component="h2" align="center" color="error">
                        {this.state.errorMessage}
                    </Typography>
                }
            </div>
        )
     }
}

export default CoursePage