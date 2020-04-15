import http from '../_helpers/http';
 
export const postServices = {
    getList,
    deleteItem,
    deleteChecked,
    getPostHot,
    insert,
    getInfo,
    update
}

function getList(data) {
    return  http.get(`posts`, {params: data})
                .then(post => {  
                    return post.data 
                })
} 

function deleteItem(id, data) {
    return  http.delete(`posts/` + id, {params: data})
                .then(posts => {  
                    return posts.data 
                })
}

function deleteChecked(data, inputs) {
    inputs.arrId = data;
    return  http.delete(`posts/delete`, {params: inputs})
                .then(posts => {  
                    return posts.data 
                })
}

function getPostHot() {
    return http.get('posts/hot')
            .then(post=> {
                    return post.data
                })
}

function insert(dataForm) {
    return http.post('posts', dataForm)
            .then(post => {
                return post.data
            })
}

function getInfo(id) {
    return http.get('posts/' + id) 
            .then(post => {
                return post.data;
            })
}

function update(id, dataForm) {
    return http.put('posts/' + id, dataForm) 
            .then(post => {
                return post.data;
            })
}