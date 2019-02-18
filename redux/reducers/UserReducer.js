import {
    USER_LIST_SUCCESS,
    USER_NOTES_SUCCESS,
    USER_NOTES_MORE_SUCCESS,
    USER_NOTES_REQUEST
} from '../actions/UserAction'

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

export function firebaseGetNotes (state = {
    notes: [],
    next: undefined,
    isLoadMore: false
}, action) {
    switch (action.type) {
        case USER_NOTES_REQUEST:
            return Object.assign({}, state, {
                isLoadMore: action.isLoadMore
            });
        case USER_NOTES_SUCCESS:
            return Object.assign({}, state, {
                ...action
            });
        case USER_NOTES_MORE_SUCCESS:
            let currentNotes = state.notes;
            console.log(
                'load more'
            );
            console.log(action);
            Array.prototype.push.apply(currentNotes, action.notes)
            return Object.assign({}, state, {
                ...action,
                notes: currentNotes
            });
        default:
            return state
    }
}