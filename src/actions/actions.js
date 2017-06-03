import {
	ACCESSTOKEN,
	DOWNLOAD_ALL,
	CHANGE_TAB,
	SCROLLTOP,
	OPEN_TOPIC,
	CLEAR_TOPIC,
	TOPIC_COLLECT,
	FETCH_DETAIL,
	FETCH_MESSAGE,
	LOGIN_OUT
} from '../constants/constants';
import fetch from 'isomorphic-fetch';
import {Toast} from 'antd-mobile';

export const fetchLogin = token => {
	return dispatch => {
		fetch('https://cnodejs.org/api/v1/accesstoken', {
			method: 'POST',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: `accesstoken=${token}`
		}).then(response => response.json()).then(json => {
			dispatch({type: ACCESSTOKEN, json, token});
			dispatch(fetchCollect(json.loginname));
			window.location.href = './#/';
		});
	};
};

const fetchCollect = (loginname) => {
	return dispacth => {
		fetch(`https://cnodejs.org/api/v1/topic_collect/${loginname}`).then(response => response.json()).then(json => {
			dispacth({type: TOPIC_COLLECT, data: json.data});
		});
	};
};


let isLoading = true;
export const fetchAll = (tab, page = 1, limit = 20) => {
	return dispatch => {
		if (isLoading) {
			isLoading = false;
			fetch(`https://cnodejs.org/api/v1/topics?tab=${tab}&page=${page}&limit=${limit}`).then(response => response.json()).then(json => {
				dispatch({type: DOWNLOAD_ALL, json, tab, page});
				isLoading = true;
			});
		}
	};
};


export const changeTab = key => ({type: CHANGE_TAB, key});


export const changeTop = (top, tab) => ({type: SCROLLTOP, top, tab});


export const fetchTopic = id => {
	return dispatch => {
		fetch(`https://cnodejs.org/api/v1/topic/${id}`).then(response => response.json()).then(json => dispatch({type: OPEN_TOPIC, json}));
	};
};

export const clearTopics = () => ({type: CLEAR_TOPIC});


export const switchCollected = (isCollected, accessToken, id, loginname) => {
	return dispatch => {
		fetch(`https://cnodejs.org/api/v1/topic_collect/${isCollected ? 'de_collect' : 'collect'}`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: `accesstoken=${accessToken}&topic_id=${id}`
		}).then(response => response.json()).then(json => {
			if (json.success) {
				dispatch(fetchCollect(loginname));
			}
		});
	};
};


export const switchSupport = (accessToken, replyId, topicId) => {
	return dispatch => {
		fetch(`https://cnodejs.org/api/v1/reply/${replyId}/ups`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: `accesstoken=${accessToken}`
		}).then(response => response.json()).then(json => {
			if (json.success) {
				dispatch(fetchTopic(topicId));
			} else {
				Toast.fail('呵呵，不能为自己点赞!!!', 1);
			}
		});
	};
};


export const fetchContent = (accessToken, content, topicId, replyId) => {
	return dispatch => {
		const postContent = replyId
		?
		`accesstoken=${accessToken}&content=${content}&reply_id=${replyId}` :
		`accesstoken=${accessToken}&content=${content}`;
		fetch(`https://cnodejs.org/api/v1/topic/${topicId}/replies`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: postContent
		}).then(response => response.json()).then(json => {
			if (json.success) {
				dispatch(fetchTopic(topicId));
			}
		});
	};
};


export const fetchPublish = (accessToken, title, tab, content) => {
	return dispatch => {
		fetch('https://cnodejs.org/api/v1/topics', {
			method: 'POST',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: `accesstoken=${accessToken}&title=${title}&tab=${tab}&content=${content}`
		}).then(response => response.json()).then(json => {
			if (json.success) {
				window.location.href = `./#/topic/${json.topic_id}`;
			} else if (!json.success) {
				Toast.fail(`${json.error_msg}`, 1);
			} else {
				Toast.fail('出错了。。。', 1);
			}
		});
	};
};


export const fetchDetail = loginname => {
	return dispatch => {
		fetch(`https://cnodejs.org/api/v1/user/${loginname}`).then(response => response.json()).then(json => {
			dispatch({type: FETCH_DETAIL, data: json.data});
		});
	};
};


export const fetchMessage = accesstoken => {
	return dispatch => {
		fetch(`https://cnodejs.org/api/v1/messages?accesstoken=${accesstoken}`).then(response => response.json()).then(json => dispatch({type: FETCH_MESSAGE, hasNotRead: json.data.hasnot_read_messages, hasRead: json.data.has_read_messages}));
	};
};


export const loginOut = () => ({type: LOGIN_OUT});
