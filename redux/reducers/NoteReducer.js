import {
    NOTE_GET_REQUEST, NOTE_GET_SUCCESS, NOTE_GET_FAILURE,
    NOTE_MORE_REQUEST, NOTE_MORE_SUCCESS, NOTE_MORE_FAILURE, NOTE_RESET,
} from '../actions/NoteAction'

import {NOTE_SYNC_REQUEST, NOTE_SYNC_SUCCESS, NOTE_SYNC_PROGRESS, NOTE_SYNC_FAILURE} from "../../services/SyncService";

import {CATEGORY_SELECT} from "../actions/CategoryAction";

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
    console.log(action.type)
    switch (action.type) {
        case NOTE_GET_REQUEST:
            return Object.assign({}, state, {
                isFirstLoading: action.isFirstLoading,
                isFetching: true,
                isRefresh: action.isRefresh,
                notes: [],
                hasMore: false
            });
        case NOTE_GET_SUCCESS:
            return Object.assign({}, state, {
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
                //notes: [],
                isRefresh: false,
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
        case NOTE_RESET:
            return Object.assign({}, state, {
                notes: [],
                offset: 0,
                hasMore: false
            });
        default:
            return state
    }
}

export function sqliteGetNoteCategory (state = {
    categoryId: undefined
}, action) {
    switch (action.type) {
        case CATEGORY_SELECT:
            return Object.assign({}, state, {
                categoryId: action.categoryId
            });
        default:
            return state
    }
}

export function synchronizeNote (state = {
    progress: 0,
    done: 0,
    total: 0,
    isSynchronizing: false,
    canClose: false,
}, action) {
    switch (action.type) {
        case NOTE_SYNC_REQUEST:
            return Object.assign({}, state, {
                isSynchronizing: true,
                canClose: false,
                progress: 0,
                done: 0
            });
        case NOTE_SYNC_PROGRESS:
            return Object.assign({}, state, {
                ...action.data
            });
        case NOTE_SYNC_SUCCESS:
        case NOTE_SYNC_FAILURE:
            return Object.assign({}, state, {
                isSynchronizing: false,
                canClose: true
            });
        default:
            return state
    }
}

function hasMore(data) {
    const {offset, limit, total} = data;
    return (offset + limit < total)
}