import axios from "axios";
import {config} from '../_constants/config';
import {history} from './history';

const getJwt = () => {
	return "Bearer " + localStorage.getItem('user-token');
}

axios.defaults.baseURL = config.PATH_API;
axios.defaults.headers.common['Authorization'] = getJwt();

axios.interceptors.request.use(config => {
	axios.defaults.headers.common['Authorization'] = getJwt();
	return config;
});

axios.interceptors.response.use(null, error => {
	const expectedError =
		error.response &&
		error.response.status >= 400 &&
		error.response.status < 500;

	if (error.response.status === 401) {
		localStorage.removeItem('user-token');
		localStorage.removeItem('user');
		localStorage.removeItem('expires');
		history.push('/login');
	}

	if (!expectedError) {
		
	}

	return Promise.reject(error.response);
});

const setJwt = (jwt) => {
	axios.defaults.headers.common["Authorization"] = getJwt();
}

export default {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
	setJwt,
	getJwt
};