import React, {useState, useContext, useEffect} from 'react'
import SoldierCoursesServer from './server/SoldierCoursesServer'

const SoldierCoursesContext = React.createContext()
const CoursesUpdateContext = React.createContext()

export function useSoldierCourses() {
    return useContext(SoldierCoursesContext)
}

export function useSoldierCoursesUpdate() {
    return useContext(CoursesUpdateContext)
}

export function SoldierCoursesProvider({ children}) {
    const [soldierCourses, setCourses] = useState([])

    function updateSoldierCourses(value) {
        setCourses([...soldierCourses, ...value])
    }

    useEffect(() => {
        async function getSoldierCourses() {
            const courses = await SoldierCoursesServer.getAllSoldierCourses("8670224")

            if (Array.isArray(courses)) {
                setCourses(courses)
            }
        }
        getSoldierCourses()  
    }, []) 

    return(
        <SoldierCoursesContext.Provider value={soldierCourses}>
            <CoursesUpdateContext.Provider value={updateSoldierCourses}>
                {children}
            </CoursesUpdateContext.Provider>
        </SoldierCoursesContext.Provider>
    )
}