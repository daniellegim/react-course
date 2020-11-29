import axios from 'axios'

export default class CoursesServer {

    static getAllCourses() {
        return axios.get("/courses")
                .then(response => response.data)
                .catch(err => err.message)
    }

    static AddNewCourse(newCourse) {
        return axios.post("/courses", { newCourse })
                .then(response => response.data)
                .catch(err => err.message)
    }
}