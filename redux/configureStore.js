import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { reducer as formReducer } from 'redux-form'

let createStoreWithMiddleware = applyMiddleware(
    thunk
)(createStore);

// Add the reducer to your store on the `routing` key
export const store = createStoreWithMiddleware(
    combineReducers({
        ...reducers,
        form: formReducer,
    })
);