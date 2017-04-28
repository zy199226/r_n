import {OPEN_CHANGE} from '../constants/constants';

export function openChange(text) {
	return {type: OPEN_CHANGE, text};
}
