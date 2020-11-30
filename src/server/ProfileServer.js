import axios from 'axios'

export default class ProfileServer {

    static getUser(persnumber) {
        return axios.get("/profile/" + persnumber)
                .then(response => response.data)
                .catch(err => err.message)
    }
}