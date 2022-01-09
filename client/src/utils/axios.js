import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

instance.interceptors.request.use(
	(config) => {
		const user = localStorage.getItem('armaUser');
		const token = user.token;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(err) => {
		Promise.reject(err);
	},
);

export default instance;