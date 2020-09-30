import React from 'react'
import {useFutureCourses} from './FutureCoursesContext'

function FutureCourses() {
    const futureCourses = useFutureCourses()

    return(
        <div>
            <h1>Hi</h1>
            {futureCourses.length !== 0 && futureCourses[0].name}
        </div>
    )
}

export default FutureCourses