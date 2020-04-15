import { Message } from 'element-react';
import 'element-theme-default';

import { postServices } from '../_services/post';
import { postConstants } from '../_constants/post'; 
import { history } from '../_helpers/history';
import { config } from '../_constants/config'; 

export const postAction = {
    getList,
    deleteItem,
    deleteChecked,
    getPostHost,
    insert,
    getInfo,
    update
};

function getList(search) {
    const success = (data) => { return { type: postConstants.GET_POST_LIST , data } }
    const request = () => { return { type: postConstants.REQUEST_LIST  } }

    return dispatch => {
        dispatch(request());
        postServices.getList(search)
            .then(
                post => {
                    dispatch(success(post));
                }, 
                error =>{
                    Message({
                        message: error.data.message,
                        type: 'warning'
                    });
                }
            )
    }
}

function deleteItem(id, inputs, urlBack = null) {
    const request = () => { return { type: postConstants.REQUEST_LIST  } }
    const success = (data) => { return { type: postConstants.GET_POST_LIST , data } }

    return dispatch => {
        dispatch(request());
        postServices.deleteItem(id, inputs)
        .then(
            post => {
                
                Message({
                    message: post.message,
                    type: 'success'
                });
                
                if(urlBack) 
                    history.push(config.PATH_ADMIN + urlBack);
                else
                    dispatch(success(post.data));
            },
            error => {
                Message({
                    message: error.data.message,
                    type: 'warning'
                });
            }
        )
    } 
}

function deleteChecked(data, inputs) {
    const request = () => { return { type: postConstants.REQUEST_LIST  } }
    const success = (data) => { return { type: postConstants.GET_POST_LIST , data } }

    return dispatch => {
        dispatch(request());
        postServices.deleteChecked(data, inputs)
            .then(
                post => {
                    Message({
                        message: post.message,
                        type: 'success'
                    });
                    dispatch(success(post.data));
                },
                error => {
                    Message({
                        message: error.data.message,
                        type: 'warning'
                    });
                }
            )
    }
}

function getPostHost() {
    const success = (data) => { return { type: postConstants.GET_POST_HOT , data } }

    return dispatch => {
        postServices.getPostHot()
            .then(
                post => {
                    dispatch(success(post));
                },
                error => {
                    Message({
                        message: error.data.message,
                        type: 'warning'
                    });
                }
            )
    }
}

function insert(dataForm, urlBack) {
    const request = () => { return { type: postConstants.REQUEST_FORM  } }

    return dispatch => {
        dispatch(request())
        postServices.insert(dataForm)
        .then(
            post => {
                setTimeout(() => {
                    Message({
                        message: post.message,
                        type: 'success'
                    });
                    history.push(config.PATH_ADMIN + urlBack); 
                }, 500);
            },
            error => {
                Message({
                    message: error.data.message,
                    type: 'warning'
                });
            }
        )
    }
}

function getInfo(id) {
    const success = (data) => { return { type: postConstants.GET_INFO_POST , data } }

    return dispatch => {
        postServices.getInfo(id)
        .then(
            post => {
                dispatch(success(post))
            },
            error => {

            }
        )
    }
}

function update(id, dataForm, urlBack) {
    const request = () => { return { type: postConstants.REQUEST_FORM  } }

    return dispatch => {
        dispatch(request());
        postServices.update(id, dataForm)
        .then(
            post => {
                setTimeout(() => {
                    Message({
                        message: post.message,
                        type: 'success'
                    });
                    history.push(config.PATH_ADMIN + urlBack); 
                }, 500);
            },
            error => {
                Message({
                    message: error.data.message,
                    type: 'warning'
                });
            }
        )
    }
}