//Thanks Jon and Dakota!

import axios from 'axios';
import jwtDecode from 'jwt-decode'

const httpUser = axios.create();

httpUser.getToken = function() {
    return localStorage.getItem('token');
};

httpUser.setToken = function(token) {
    localStorage.setItem('token', token);
    return token;
};

httpUser.getCurrentUser = function() {
    const defaultUser = {
        firstName: 'Nobody',
        lastName: 'Logged In',
        birthday: '11/11/2000',
        email: 'joe.schmoe@gmail.com',
        password: '1234',
        birthtime: "11:00",
        username: 'No one logged in',
    };
    const token = this.getToken();
    return (token ? jwtDecode(token) : defaultUser)
};

httpUser.logIn = async function(credentials) {
    try {
        console.log("logging in...");
        const response = await axios.post( '/api/user/authenticate', credentials );

        const token = response.data.token;
        if(token) {
            this.defaults.headers.common.token = this.setToken(token);
            return jwtDecode(token);
        } else {
            return false;
        }
    } catch(err) {
        console.log(err);
        return false;
    }
};

httpUser.signUp = async function(userInfo) {
    const response = await axios.post('/api/user', userInfo, {headers: {'Content-Type': 'application/json'}});

    const token = response.data.token;
    if(token) {
        this.defaults.headers.common.token = this.setToken(token);
        return jwtDecode(token);
    } else {
        return false;
    }
};

httpUser.logOut = function() {
    console.log("logging out...");
    localStorage.removeItem('token');
    delete this.defaults.headers.common.token;
    return true;
};

httpUser.defaults.headers.common.token = httpUser.getToken();
export default httpUser;