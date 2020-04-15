import {categoriesService} from '../_services/categories';
import {categoriesConstants} from '../_constants/categories';
import { Message } from 'element-react';
import 'element-theme-default';

export const categoriesAction = {
    getTree,
    deleteItem,
    insert,
    getCategory,
    getCategoryByPost
};

function getTree(){
    
    return dispatch => {

        const success = (categories) => { return { type: categoriesConstants.GET_CATEGORY_TREE, categories } }
        categoriesService.tree()
        .then(
            category => { 
                dispatch(success(category));
            },
            error => {
                Message({
                    message: error.data.message,
                    type: 'warning'
                });
            }
        );
    };
}

function deleteItem(data) {
    const success = (data) => { return { type: categoriesConstants.DELETE_SUCCESS, data } }

    return dispatch => {
        categoriesService.deleteItem(data.id)
        .then(
            categories => { 
                Message({
                    message: categories.message,
                    type: 'success'
                });
                dispatch(success(categories.data));
            },
            error => {
                Message({
                    message: error.data.message,
                    type: 'warning'
                });
            }
        );
    }
}

function insert(data) {
    const success = (categories) => { return { type: categoriesConstants.GET_CATEGORY_TREE, categories } }
    
    return dispatch => {
        categoriesService.insert(data)
            .then(
                categories => { 
                    dispatch(success(categories.data));
                },
                error => {
                    Message({
                        message: error.data.message,
                        type: 'warning'
                    });
                }
            );
    }
}

function getCategory(id) {
    const success = (categories) => { return { type: categoriesConstants.CATEGORY_PARENT_POST, categories } }

    return dispatch => {
        categoriesService.getCategoryPost(id)
            .then(
                categories => {
                    dispatch(success(categories));
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


function getCategoryByPost(id) {
    const success = (categories) => { return { type: categoriesConstants.CATEGORY_PARENT_CATEGORY, categories } }

    return dispatch => {
        categoriesService.getCategoryPost(id)
            .then(
                categories => {
                    dispatch(success(categories));
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
