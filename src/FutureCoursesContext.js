import React, {useState, useContext} from 'react'

const FutureCoursesContext = React.createContext()
const CoursesUpdateContext = React.createContext()

export function useFutureCourses() {
    return useContext(FutureCoursesContext)
}

export function useFutureCoursesUpdate() {
    return useContext(CoursesUpdateContext)
}

export function FutureCoursesProvider({ children}) {
    const [futureCourses, setCourses] = useState([])

    function updateFutureCourses(value) {
        setCourses([...futureCourses, ...value])
    }

    return(
        <FutureCoursesContext.Provider value={futureCourses}>
            <CoursesUpdateContext.Provider value={updateFutureCourses}>
                {children}
            </CoursesUpdateContext.Provider>
        </FutureCoursesContext.Provider>
    )
}