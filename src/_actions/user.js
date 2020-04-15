import {userService} from '../_services/user';
import {userConstants} from '../_constants/user';
import {history} from '../_helpers/history';
import {config} from '../_constants/config';

import { Message } from 'element-react';
import 'element-theme-default';

export const userActions = {
    login,
    checkLogin,
    logout
};

function login(inputs) {
    const success = (user) => { return { type: userConstants.LOGIN_SUCCESS, user } }
    const request = (user) => { return { type: userConstants.LOGIN_REQUEST, user } }
    const failure = (error) => { return { type: userConstants.LOGIN_FAILURE, error } }

    return dispatch => {
        dispatch(request(inputs));

        userService.login(inputs)
            .then(
                user => { 
                    userService.getUserLogin()
                        .then(
                            user => { 
                                dispatch(success(user));
                                history.push(config.PATH_ADMIN);
                            }
                        )
                },
                error => {
                    Message({
                        message: error.data.message,
                        type: 'warning'
                    });
                    dispatch(failure(error.data));
                }
            );
    };
}

function checkLogin() {
    const success = (user) => { return { type: userConstants.LOGIN_SUCCESS, user } }

    return dispatch => {
        userService.getUserLogin()
            .then(
                user => { 
                   dispatch(success(user));
                },
                error => {
                    console.log(error)
                }
            );
    };
}

function logout() {
    userService.logout();
    history.push('/login');
    return { type: userConstants.LOGOUT };
}