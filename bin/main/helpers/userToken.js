import Conf from 'conf';

const config = new Conf({ projectName: 'flogram' });

export const setToken = (access_token) => {
	conf.set('access_token', access_token);
	return;
};

export const resetToken = () => {
	conf.clear();
};

export const getToken = () => {
	return conf.get('access_token') || '';
};
