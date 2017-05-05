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
        selTab: 'all',
        all: {
            limit: 20,
            page: 0,
            scrollT: 0,
            topics: true
        },
        good: {
            page: 0
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
                    pic: action.json
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
    let data = {
        limit: 20,
        page: action.page,
        topics: action.json.data
    };
    return Object.assign({}, home, {
		selTab: action.tab,
        [action.tab]: data
    });
};


// const todoApp = combineReducers({loginToken, });
//
// export default todoApp;
