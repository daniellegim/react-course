import React, {Component} from "react"
import Header from "./Header"
import Course from "./Course"
import { format } from "date-fns"

class CoursePage extends Component {
    constructor() {
        super()
        this.state = {
            courses: [],
            filteredCourses: [],
            courseName: "",
            selectedDate: new Date()
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleAddClick = this.handleAddClick.bind(this)
    }

    handleInputChange(event) {
        const value = event.target.value 
        this.setState({courseName: value})

        const filtered = this.state.courses.filter(course => course.name.toLowerCase().includes(value.toLowerCase()))
        this.setState({filteredCourses: filtered})
    }

    handleDateChange(date) {
        this.setState({selectedDate: date})

        const foramttedDate = format(date, "dd.MM.yyyy")
        const filteredDates = this.state.courses.filter(course => course.dates.includes(foramttedDate))
        this.setState({filteredCourses: filteredDates})
    }

    handleAddClick(){
        const courseName = this.state.courseName
        const selectedDate = this.state.selectedDate
        const courseDates = []

        const foramttedDate = format(selectedDate, "dd.MM.yyyy")

        courseDates.push(foramttedDate)

        const newCourse = {
            name: courseName,
            dates: courseDates,
            gmush: "50",
            description: courseName
        }

        if (this.state.courses.includes(courseName)) {
            console.log("hi")
        } else {
            this.setState({
                courses: this.state.courses.concat(newCourse),
                filteredCourses: this.state.courses.concat(newCourse),
            })
        }
    }

    componentDidMount() {
        fetch("https://api.mocki.io/v1/07bc5d06")
        .then(response => response.json())
        .then(data => {
          this.setState({courses: data, filteredCourses: data})
        })
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
                <Course courses={this.state.filteredCourses}/>
            </div>
        )
     }
}

export default CoursePage