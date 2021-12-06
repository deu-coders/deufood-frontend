import axiosModule from 'axios';

const axiosInstance = axiosModule.create({
	baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use(config => {
	const token = localStorage.getItem('token');

	if (token !== null) {
		config.headers!['Authorization'] = `Token ${token}`;
	}
	return config;
});

export default axiosInstance;
