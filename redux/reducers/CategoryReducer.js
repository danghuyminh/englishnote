import {
    NOTE_GET_REQUEST, NOTE_GET_SUCCESS, NOTE_GET_FAILURE,
    NOTE_MORE_REQUEST, NOTE_MORE_SUCCESS, NOTE_MORE_FAILURE
} from '../actions/NoteAction'

const initialState = {
    categories: [],
    isFetching: false
};

export function sqliteGetCategory (state = initialState, action) {
    switch (action.type) {
        case NOTE_GET_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case NOTE_GET_SUCCESS:
            return Object.assign({}, state, {
                ...action.data,
                isFetching: false,
            });
        case NOTE_GET_FAILURE:
            return Object.assign({}, state, {
                isFetching: true
            });
        default:
            return state
    }
}