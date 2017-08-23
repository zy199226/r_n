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
// import {combineReducers} from 'redux';

const initialState = {
    drawer: {
        bollean: false
    },
    login: {
        pic: ''
    },
    home: {
        selTab: '1'
    },
    article: {
        topicId: '',
        data: {
            replies: []
        }
    },
    profile: {
        collectedTopics: [],
        recent_replies: [],
        recent_topics: []
    },
    message: {
        hasNotRead: [],
        hasRead: []
    }
};

export default function updata(state = initialState, action) {
    switch (action.type) {
    case ACCESSTOKEN:
        return Object.assign({}, state, {
            login: {
                accessToken: action.token,
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
    case CHANGE_TAB:
        return Object.assign({}, state, {
            home: tab(action.key, state.home)
        });
    case SCROLLTOP:
        return Object.assign({}, state, {
            home: top(action, state.home)
        });
    case OPEN_TOPIC:
        return Object.assign({}, state, {
            article: {
                data: action.json.data,
                topicId: action.json.data.id
            }
        });
    case CLEAR_TOPIC:
        return Object.assign({}, state, {
            article: {
                data: {
                    replies: []
                },
                topicId: ''
            }
        });
    case TOPIC_COLLECT:
        return Object.assign({}, state, {
            profile: collect(action, state.profile)
        });
    case FETCH_DETAIL:
        return Object.assign({}, state, {
            profile: detail(action, state.profile)
        });
    case FETCH_MESSAGE:
        return Object.assign({}, state, {
            message: {
                hasNotRead: action.hasNotRead,
                hasRead: action.hasRead
            }
        });
    case LOGIN_OUT:
        return Object.assign({}, initialState, { home: state.home });
    default:
        return state;
    }
}

const detail = (action, profile) => Object.assign({}, profile, action.data);

const collect = (action, profile) => Object.assign({}, profile, {
    collectedTopics: action.data
});

const topics = (action, home) => {
    let topics = action.json.data;
    if (home[action.tab] && home[action.tab].topics) {
        topics = home[action.tab].topics.concat(topics);
    }
    const data = {
        limit: 20,
        page: action.page,
        topics
    };
    return Object.assign({}, home, {
        [action.tab]: data
    });
};

const tab = (key, home) => Object.assign({}, home, { selTab: key });

const top = (action, home) => {
    const data = Object.assign({}, home[action.tab], { scrollT: action.top });
    return Object.assign({}, home, { [action.tab]: data });
};


// const todoApp = combineReducers({loginToken, });
//
// export default todoApp;
