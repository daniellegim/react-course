import React, {useState, useContext} from 'react'

const CoursesContext = React.createContext()
const CoursesUpdateContext = React.createContext()

export function useCourses() {
    return useContext(CoursesContext)
}

export function useCoursesUpdate() {
    return useContext(CoursesUpdateContext)
}

export function CoursesProvider({ children}) {
    const [courses, setCourses] = useState()

    function handleInputChange(event) {
        this.setState({courseName: event.target.value}, this.filterCourses)
    }

    function filterCourses() {
        const courseName = this.state.courseName
        const date = this.state.selectedDate

        if (courseName == "") {
            setCourses({filteredCourses: this.state.courses})
        } else {
            const formattedDate = format(date, "dd.MM.yyyy")
            const filtered = this.state.courses.filter(course => 
                (course.name.toLowerCase().includes(courseName.toLowerCase())) &&
                (course.dates.includes(formattedDate)))

            setCourses({filteredCourses: filtered})
        }
    }

    return(
        <CoursesContext.Provider value={courses}>
            <CoursesUpdateContext.Provider value={handleInputChange}>
                {children}
            </CoursesUpdateContext.Provider>
        </CoursesContext.Provider>
    )
}