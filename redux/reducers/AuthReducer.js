import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE } from '../actions/AuthAction'

export default function AuthReducer (state = {

}, action) {
    switch (action.type) {
        case AUTH_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case AUTH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.data
            };
        case AUTH_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        default:
            return state
    }
}