import {OPEN_CHANGE, ACCESSTOKEN, DOWNLOAD_ALL, CHANGE_TAB, SCROLLTOP, OPEN_TOPIC} from '../constants/constants';
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
			dispatch(fetchLogins(json));
		});
	};
};

const fetchLogins = json => ({type: ACCESSTOKEN, json});


let isLoading = true;
export const fetchAll = (tab, page = 1, limit = 20) => {
	return dispatch => {
		if (isLoading) {
			isLoading = false;
			fetch(`https://cnodejs.org/api/v1/topics?tab=${tab}&page=${page}&limit=${limit}`).then(response => response.json()).then(json => {
				dispatch(fetchAlls(json, tab, page));
				isLoading = true;
			});
		}
	};
};

const fetchAlls = (json, tab, page) => ({type: DOWNLOAD_ALL, json, tab, page});


export const changeTab = key => ({type: CHANGE_TAB, key});


export const changeTop = (top, tab) => ({type: SCROLLTOP, top, tab});


export const fetchTopic = id => {
	return dispatch => {
		fetch(`https://cnodejs.org/api/v1/topic/${id}`).then(response => response.json()).then(json => {
			dispatch(fetchTopics(json));
		});
	};
};

const fetchTopics = json => ({type: OPEN_TOPIC, json});
