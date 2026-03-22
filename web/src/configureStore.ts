import { applyMiddleware, createStore, compose, Store } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const enhancers: any[] = [];
const middleware = [thunk];

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export default function configureStore(initialState?: any): Store {
	const store = createStore(rootReducer as any, initialState, composedEnhancers);
	return store;
}
