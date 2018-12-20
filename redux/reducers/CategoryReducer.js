import {
    CATEGORY_GET_REQUEST, CATEGORY_GET_SUCCESS, CATEGORY_GET_FAILURE,
    CATEGORY_CREATE_SUCCESS
} from '../actions/CategoryAction'

const initialState = {
    categories: [],
    isFetching: false
};

export function sqliteGetCategory (state = initialState, action) {
    switch (action.type) {
        case CATEGORY_GET_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case CATEGORY_GET_SUCCESS:
        case CATEGORY_CREATE_SUCCESS:
            return Object.assign({}, state, {
                ...action.data,
                isFetching: false,
            });
        case CATEGORY_GET_FAILURE:
            return Object.assign({}, state, {
                isFetching: true
            });
        default:
            return state
    }
}