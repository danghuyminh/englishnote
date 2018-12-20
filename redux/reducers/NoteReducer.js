import {
    NOTE_GET_REQUEST, NOTE_GET_SUCCESS, NOTE_GET_FAILURE,
    NOTE_MORE_REQUEST, NOTE_MORE_SUCCESS, NOTE_MORE_FAILURE
} from '../actions/NoteAction'

const initialState = {
    notes: [],
    limit: 10,
    offset: 0,
    hasMore: false,
    isLoadingMore: true,
    isFetching: false,
    isRefresh: false,
    isFirstLoading: false,
};

export function sqliteGetNote (state = initialState, action) {
    switch (action.type) {
        case NOTE_GET_REQUEST:
            return Object.assign({}, state, {
                isFirstLoading: action.isFirstLoading,
                notes: [],
                isFetching: true
            });
        case NOTE_GET_SUCCESS:
            return Object.assign({}, state, {
                ...action.data,
                ...action.data,
                isFetching: false,
                isFirstLoading: false,
                isRefresh: action.isRefresh,
                hasMore: hasMore(action.data),
                isLoadingMore: false
            });
        case NOTE_GET_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isFirstLoading: false,
            });
        case NOTE_MORE_REQUEST:
            return Object.assign({}, state, {
                notes: [],
                isLoadingMore: true
            });
        case NOTE_MORE_SUCCESS:
            return Object.assign({}, state, {
                ...action.data,
                isLoadingMore: false,
                isRefresh: false,
                hasMore: hasMore(action.data)
            });
        case NOTE_MORE_FAILURE:
            return Object.assign({}, state, {
                isLoadingMore: false
            });
        default:
            return state
    }
}

function hasMore(data) {
    const {offset, limit, total} = data;
    return !(offset + limit === total)
}