import React, {Component} from "react"
import Card from "./Card"

class Course extends Component {
    constructor() {
        super()
        this.state = {
            courses: []
        }
    }

    componentDidMount() {
        fetch("https://api.mocki.io/v1/07bc5d06")
        .then(response => response.json())
        .then(data => {
          this.setState({courses: data})
        })
    }

    render() {
       const courses = this.state.courses.map(course => <Card course={course}/>)
        return(
            <div>
                {courses}
            </div>
        )
    }
}

export default Course