import React from "react"
import Card from "./Card"

function Course(props) {
    const courses = props.courses.map(course => <Card course={course}/>)
    return(
        <div>
            {courses}
        </div>
    )
}

export default Course