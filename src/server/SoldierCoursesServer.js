import axios from 'axios'

export default class SoldierCoursesServer {

    static getAllSoldierCourses(persnumber) {
        return axios.get("/soldierCourses/" + persnumber)
                .then(response => response.data)
                .catch(err => err.message)
    }
}