import http from '../_helpers/http';

export const categoriesService = {
    tree,
    deleteItem,
    insert,
    getCategoryPost
};

function tree(inputs) {
    return  http.get(`categories/tree`)
                .then(categories => {  
                    return categories.data 
                })
}

function deleteItem(id) {
    return  http.delete(`categories/` + id)
                .then(categories => {  
                    return categories.data 
                })
}

function insert(data) {
    return http.post('categories', data)    
                .then((categories) => {
                    return categories.data
                });
}

function getCategoryPost(id) {
    return http.get('categories/post/' + id)    
            .then((categories) => {
                return categories.data
            });
}