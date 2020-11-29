import React, {Component} from "react"
import Header from "./Header"
import Course from "./Course"
import CoursesServer from './server/CoursesServer'
import { format } from "date-fns"
import Typography from '@material-ui/core/Typography'
import Cart from './Cart'
import Grid from '@material-ui/core/Grid'

class CoursePage extends Component {
    constructor() {
        super()
        this.state = {
            courses: [],
            filteredCourses: [],
            errorMessage: "",
            courseName: "",
            selectedDate: new Date()
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.filterCourses = this.filterCourses.bind(this)
        this.handleAddClick = this.handleAddClick.bind(this)
    }

    async componentDidMount() {
        const data = await CoursesServer.getAllCourses()

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
        const courseDates = []

        const formattedDate = format(selectedDate, "dd.MM.yyyy")
        
        const filtered = this.state.courses.filter(course => 
            course.name.toLowerCase() === courseName.toLowerCase())

        if (filtered.length !== 0) {
            filtered[0].dates.push(formattedDate)

            const newCourses = this.state.courses.map(course => 
                course.name.toLowerCase() === courseName ? filtered[0] : course)
            
            this.setState({
                courses: newCourses,
                filteredCourses: newCourses
            }, this.filterCourses)
        } else {
            //courseDates.push(formattedDate)
            courseDates.push(selectedDate)

            const newCourse = {
                name: courseName,
                dates: courseDates,
                gmush: "50",
                description: courseName
            }

            const courseAdded = await CoursesServer.AddNewCourse(newCourse)

            console.log(courseAdded)

            //for server use selected date
            //for setState use formattedDate

            this.setState({
                courses: this.state.courses.concat(newCourse),
                filteredCourses: this.state.courses.concat(newCourse),
            }, this.filterCourses)
        }
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