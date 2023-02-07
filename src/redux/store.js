import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

const middleware = [thunkMiddleware];
const middlewareEnhancer = applyMiddleware(...middleware);
export default store = createStore(rootReducer, middlewareEnhancer);
