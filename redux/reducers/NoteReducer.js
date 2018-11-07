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
            return {
                ...state,
                isFirstLoading: action.isFirstLoading,
                notes: [],
                isFetching: true
            };
        case NOTE_GET_SUCCESS:
            const {offset, limit, total} = action.data;

            return {
                ...state,
                ...action.data,
                isFetching: false,
                isFirstLoading: false,
                hasMore: !(offset + limit === total),
                isRefresh: true,
                isLoadingMore: false
            };
        case NOTE_GET_FAILURE:
            return {
                isFetching: false,
                isFirstLoading: false,
            };
        case NOTE_MORE_REQUEST:
            return {
                ...state,
                notes: [],
                isLoadingMore: true
            };
        case NOTE_MORE_SUCCESS:
            return {
                ...state,
                ...action.data,
                isLoadingMore: false,
                hasMore: !(offset + limit === total),
                isRefresh: false
            };
        case NOTE_MORE_FAILURE:
            return {
                isLoadingMore: false
            };
        default:
            return state
    }
}