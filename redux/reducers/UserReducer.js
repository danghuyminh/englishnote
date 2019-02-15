import {
    USER_LIST_SUCCESS
} from '../actions/UserAction'
import {AUTH_SUCCESS} from "../actions/AuthAction";

const initialState = {
    users: []
};

export function firebaseGetUsers (state = initialState, action) {
    switch (action.type) {
        case USER_LIST_SUCCESS:
            return Object.assign({}, state, {
                users: action.data,
            });
        default:
            return state
    }
}