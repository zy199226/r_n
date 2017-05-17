import {OPEN_CHANGE, ACCESSTOKEN, DOWNLOAD_ALL} from '../constants/constants';
// import {combineReducers} from 'redux';

const initialState = {
    drawer: {
        bollean: false
    },
    login: {
        pic: ''
    },
    home: {
        all: {
            limit: 20,
            page: 0,
            topics: ''
        }
    }
};

export default function updata(state = initialState, action) {
    switch (action.type) {
        case OPEN_CHANGE:
            return Object.assign({}, state, {
                drawer: {
                    bollean: !state.drawer.bollean
                }
            });
        case ACCESSTOKEN:
            return Object.assign({}, state, {
                login: {
                    pic: action.json.avatar_url,
					id: action.json.id,
					loginname: action.json.loginname,
					success: action.json.success
                }
            });
        case DOWNLOAD_ALL:
            return Object.assign({}, state, {
                home: topics(action, state.home)
            });
        default:
            return state;
    }
}

const topics = (action, home) => {
	let topics = action.json.data;
	if (home[action.tab] && home[action.tab].topics) {
		topics = home[action.tab].topics.concat(topics);
	}
    let data = {
        limit: 20,
        page: action.page,
        topics: topics
    };
    return Object.assign({}, home, {
        [action.tab]: data
    });
};


// const todoApp = combineReducers({loginToken, });
//
// export default todoApp;
