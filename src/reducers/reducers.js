import {OPEN_CHANGE} from '../constants/constants';

const initialState = {
	drawer: false,
};

export default function updata(state = initialState, action) {
	switch (action.type) {
		case OPEN_CHANGE:
			return Object.assign({}, state, {drawer: !state.drawer});
		default:
			return state;
	}
}
