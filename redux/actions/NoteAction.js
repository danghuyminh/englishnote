import {Sqlite} from "../../services/DbService";

export const NOTE_CREATE_REQUEST   = 'ASYNC_NOTE_CREATE_REQUEST';
export const NOTE_CREATE_SUCCESS   = 'ASYNC_NOTE_CREATE_SUCCESS';
export const NOTE_CREATE_FAILURE   = 'ASYNC_NOTE_CREATE_FAILURE';

export const NOTE_GET_REQUEST   = 'ASYNC_NOTE_GET_REQUEST';
export const NOTE_GET_SUCCESS   = 'ASYNC_NOTE_GET_SUCCESS';
export const NOTE_GET_FAILURE   = 'ASYNC_NOTE_GET_FAILURE';

export const NOTE_MORE_REQUEST   = 'ASYNC_NOTE_MORE_REQUEST';
export const NOTE_MORE_SUCCESS   = 'ASYNC_NOTE_MORE_SUCCESS';
export const NOTE_MORE_FAILURE   = 'ASYNC_NOTE_MORE_FAILURE';

export function createNote(params) {

    return async dispatch => {
        dispatch(request());

        try {
            const result = await Sqlite.createNote(params);
            dispatch(success());
            return result;
        } catch (error) {
            dispatch(failure(error.toString()));
            throw error.toString()
        }
    };

    function request() { return { type: NOTE_CREATE_REQUEST } }
    function success(data) { return { type: NOTE_CREATE_SUCCESS, data } }
    function failure(error) { return { type: NOTE_CREATE_FAILURE, error } }
}

export function fetchNotes(params) {

    const isFirstLoading = params && params.isFirstLoading;
    const isRefresh = params && params.isRefresh;

    return async dispatch => {
        dispatch(request());

        try {
            const result = await Sqlite.selectNotes(params);
            dispatch(success(result));
            return result;
        } catch (error) {
            dispatch(failure(error.toString()));
            throw error.toString()
        }
    };

    function request() { return { type: NOTE_GET_REQUEST, isFirstLoading, isRefresh} }
    function success(data) { return { type: NOTE_GET_SUCCESS, data, isFirstLoading, isRefresh } }
    function failure(error) { return { type: NOTE_GET_FAILURE, error, isFirstLoading } }
}

export function fetchMoreNotes(params) {

    return async dispatch => {
        dispatch(request());

        try {
            const result = await Sqlite.selectNotes(params);
            dispatch(success(result));
            return result;
        } catch (error) {
            dispatch(failure(error.toString()));
            throw error.toString()
        }
    };

    function request() { return { type: NOTE_MORE_REQUEST } }
    function success(data) { return { type: NOTE_MORE_SUCCESS, data } }
    function failure(error) { return { type: NOTE_MORE_FAILURE, error } }
}