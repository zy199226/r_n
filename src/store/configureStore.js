import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import updata from '../reducers/reducers';

export default function configureStore() {
	return createStore(
		updata,
		applyMiddleware(
			thunk,
			logger()
		)
	);
}
