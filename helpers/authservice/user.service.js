import { authHeader } from './auth-header';

import jwt_decode from "jwt-decode";
export const userService = {
    login,
    logout,
    register,
    getAll,
};

function login(email, password) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`/users/register`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

function setToken(accessToken, refreshToken) {
    sessionStorage.setItem("access_token", accessToken);
    sessionStorage.setItem("refresh_token", refreshToken);
    const jwt = jwt_decode(accessToken);
    sessionStorage.setItem("exp", jwt.exp);
    return jwt;
}

function expiredToken() {
    if (sessionStorage.getItem("exp")) {
        var expired = new Date(sessionStorage.getItem("exp") * 1000);
        if (new Date() > expired) return true;
    }
    return false;
}

function refreshTokenInterceptors() {
    // axios.interceptors.response.use(
    //     response => response,
    //     error => {
    //         const status = error.response ? error.response.status : null;
    //         if (status === 401) {
    //             const accessToken = sessionStorage.getItem("access_token");
    //             const refreshToken = sessionStorage.getItem("refresh_token");
    //             if (refreshToken) {
    //                 return this.refreshToken(accessToken, refreshToken)
    //                     .then(token => {
    //                         error.config.headers.Authorization = `Bearer ${token}`;
    //                         return axios.request(error.config);
    //                     })
    //                     .catch(err => err);
    //             }
    //         }
    //         if (status === 409) {
    //             sessionStorage.clear();
    //             router.push({
    //                 name: "login",
    //                 params: {
    //                     error: "중복 로그인 되었습니다. 다시 로그인 해주시기 바랍니다.",
    //                 },
    //             });
    //             return false;
    //         }
    //     if (status === 500) {
    //         let err = {
    //             data: {
    //                 resltMsg : '오류가 발생하였습니다.\n관리자에게 문의해주세요.'
    //             }
    //         };
    //         return Promise.reject(err);
    //     }
    //         return Promise.reject(error);
    //     },
    // );
}

function refreshToken(accessToken, refreshToken) {
    // const token = {
    //     workerAccsToken: accessToken,
    //     workerRefrsToken: refreshToken,
    // };
    // return axios
    //     .post("/backend", token)
    //     .then(({ data }) => {
    //         if (data.resltData.workerAccsToken) {
    //             sessionStorage.setItem(
    //                 "access_token",
    //                 data.resltData.workerAccsToken,
    //             );
    //             sessionStorage.setItem(
    //                 "refresh_token",
    //                 data.resltData.workerRefrsToken,
    //             );
    //             const jwt = jwt_decode(data.resltData.workerAccsToken);
    //             sessionStorage.setItem("exp", jwt.exp);
    //             return data.resltData.workerAccsToken;
    //         }
    //         return Promise.reject(data);
    //     })
    //     .catch(error => {
    //         return Promise.reject(error.message);
    //     });
}

function reCaptcha(token) {
    // const data = {
    //     token: token,
    // };
    // return axios
    //     .post("reCaptchaChk.do", data)
    //     .then(response => {
    //         return response;
    //     })
    //     .catch(error => {
    //         return error;
    //     });
}
