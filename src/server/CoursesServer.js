import axios from 'axios'

export default class CoursesServer {

    getAllCourses() {
        return axios.get("/courses")
                .then(response => response.data)
                .catch(err => err.message)
    }
}