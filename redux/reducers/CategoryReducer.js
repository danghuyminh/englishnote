import {
    CATEGORY_GET_REQUEST, CATEGORY_GET_SUCCESS, CATEGORY_GET_FAILURE,
    CATEGORY_CREATE_SUCCESS, CATEGORY_GET_SINGLE_SUCCESS, CATEGORY_GET_SINGLE_REQUEST, CATEGORY_GET_SINGLE_FAILURE,
    CATEGORY_UPDATE_REQUEST, CATEGORY_UPDATE_SUCCESS, CATEGORY_UPDATE_FAILURE
} from '../actions/CategoryAction'
import {AUTH_SUCCESS} from "../actions/AuthAction";

const initialState = {
    categories: [],
    isFetching: false
};

export function sqliteGetCategory (state = initialState, action) {
    switch (action.type) {
        case CATEGORY_GET_REQUEST:
        case CATEGORY_GET_SINGLE_REQUEST:
        case CATEGORY_UPDATE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                forceReload: false,
            });
        case CATEGORY_GET_SUCCESS:
        case CATEGORY_CREATE_SUCCESS:
        case CATEGORY_UPDATE_SUCCESS:
            return Object.assign({}, state, {
                ...action.data,
                isFetching: false,
            });
        case CATEGORY_GET_FAILURE:
        case CATEGORY_GET_SINGLE_FAILURE:
        case CATEGORY_UPDATE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        case CATEGORY_GET_SINGLE_SUCCESS:
            return Object.assign({}, state, {
                data: action.data,
                isFetching: false,
            });
        case AUTH_SUCCESS:
            return Object.assign({}, state, {
                categories: [],
                forceReload: true
            });
        default:
            return state
    }
}