import http from '../_helpers/http';

export const userService = {
    login,
    getUserLogin,
    logout
};

function login(inputs) {
    return  http.post(`auth/login`, inputs)
                .then(user => {  
                    localStorage.setItem('user-token', user.data.access_token);
                    localStorage.setItem('expires', user.data.expires_at);
                    http.setJwt(http.getJwt());
                    return user.data 
                })
}

function getUserLogin() {
    return http.get(`auth/user`)
                .then(user => {
                    localStorage.setItem('user', JSON.stringify(user.data));
                    return user.data
                })
}

function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('user-token');
    localStorage.removeItem('expires');
}
