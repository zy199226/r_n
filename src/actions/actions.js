import {OPEN_CHANGE, ACCESSTOKEN, DOWNLOAD_ALL} from '../constants/constants';
import fetch from 'isomorphic-fetch';

export const openChange = () => {
	return {type: OPEN_CHANGE};
};

export const fetchLogin = token => {
	return dispatch => {
		fetch('https://cnodejs.org/api/v1/accesstoken', {
			method: 'POST',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: `accesstoken=${token}`
		}).then(response => response.json()).then(json => {
			dispatch(fetchLogins(json.avatar_url));
		});
	};
};

const fetchLogins = json => ({type: ACCESSTOKEN, json});


export const fetchAll = (tab, page = 1, limit = 20) => {
	return dispatch => {
		fetch(`https://cnodejs.org/api/v1/topics?tab=${tab}&page=${page}&limit=${limit}`).then(response => response.json()).then(json => {
			dispatch(fetchAlls(json, tab, page));
		});
	};
};

const fetchAlls = (json, tab, page) => ({type: DOWNLOAD_ALL, json, tab, page});
