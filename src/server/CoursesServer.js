import axios from 'axios'

export default class CoursesServer {

    static getAllCourses() {
        return axios.get("/courses")
                .then(response => response.data)
                .catch(err => err.message)
    }

    static addNewCourse(newCourse) {
        return axios.post("/courses", { newCourse })
                .then(response => response.data)
                .catch(err => err.message)
    }

    static updateCourse(newDate, courseID) {
        return axios.patch("/courses/" + courseID, { newDate })
                .then(response => response.data)
                .catch(err => err.message)
    }
}