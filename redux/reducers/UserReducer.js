import {
    USER_LIST_SUCCESS,
    USER_LIST_REQUEST,
    USER_LIST_FAILURE,
    USER_NOTES_SUCCESS,
    USER_NOTES_MORE_SUCCESS,
    USER_NOTES_REQUEST,
    USER_NOTE_VIEW_SUCCESS
} from '../actions/UserAction'

const initialState = {
    users: [],
    isFetching: false,
};

export function firebaseGetUsers (state = initialState, action) {
    switch (action.type) {
        case USER_LIST_SUCCESS:
            return Object.assign({}, state, {
                users: action.data,
                isFetching: false
            });
        case USER_LIST_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case USER_LIST_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
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

export function firebaseViewNote (state = {
    data: {}
}, action) {
    switch (action.type) {
        case USER_NOTE_VIEW_SUCCESS:
            return Object.assign({}, state, {
                data: action.data
            });
        default:
            return state
    }
}