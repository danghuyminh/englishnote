import {Sqlite} from "../../services/DbService";
import SyncService, {NOTE_SYNC_SUCCESS, NOTE_SYNC_FAILURE} from "../../services/SyncService";
import {Toast} from "native-base";

export const NOTE_CREATE_REQUEST   = 'ASYNC_NOTE_CREATE_REQUEST';
export const NOTE_CREATE_SUCCESS   = 'ASYNC_NOTE_CREATE_SUCCESS';
export const NOTE_CREATE_FAILURE   = 'ASYNC_NOTE_CREATE_FAILURE';

export const NOTE_UPDATE_REQUEST   = 'ASYNC_NOTE_UPDATE_REQUEST';
export const NOTE_UPDATE_SUCCESS   = 'ASYNC_NOTE_UPDATE_SUCCESS';
export const NOTE_UPDATE_FAILURE   = 'ASYNC_NOTE_UPDATE_FAILURE';

export const NOTE_GET_REQUEST   = 'ASYNC_NOTE_GET_REQUEST';
export const NOTE_GET_SUCCESS   = 'ASYNC_NOTE_GET_SUCCESS';
export const NOTE_GET_FAILURE   = 'ASYNC_NOTE_GET_FAILURE';

export const NOTE_MORE_REQUEST   = 'ASYNC_NOTE_MORE_REQUEST';
export const NOTE_MORE_SUCCESS   = 'ASYNC_NOTE_MORE_SUCCESS';
export const NOTE_MORE_FAILURE   = 'ASYNC_NOTE_MORE_FAILURE';

export const NOTE_DELETE_REQUEST   = 'ASYNC_NOTE_DELETE_REQUEST';
export const NOTE_DELETE_SUCCESS   = 'ASYNC_NOTE_DELETE_SUCCESS';
export const NOTE_DELETE_FAILURE   = 'ASYNC_NOTE_DELETE_FAILURE';

export const NOTE_GET_SINGLE_REQUEST   = 'ASYNC_NOTE_GET_SINGLE_REQUEST';
export const NOTE_GET_SINGLE_SUCCESS   = 'ASYNC_NOTE_GET_SINGLE_SUCCESS';
export const NOTE_GET_SINGLE_FAILURE   = 'ASYNC_NOTE_GET_SINGLE_FAILURE';


export const NOTE_RESET   = 'NOTE_RESET';

export function getNote(id) {

    return async dispatch => {
        dispatch(request());

        try {
            const result = await Sqlite.getNote(id);
            dispatch(success(result));
            return result;
        } catch (error) {
            dispatch(failure(error.toString()));
            throw error.toString()
        }
    };

    function request() { return { type: NOTE_GET_SINGLE_REQUEST } }
    function success(data) { return { type: NOTE_GET_SINGLE_SUCCESS, data } }
    function failure(error) { return { type: NOTE_GET_SINGLE_FAILURE, error } }
}

export function getNoteFull(id) {

    return async dispatch => {
        dispatch(request());

        try {
            const result = await Sqlite.getNoteFull(id);
            dispatch(success(result));
            return result;
        } catch (error) {
            dispatch(failure(error.toString()));
            throw error.toString()
        }
    };

    function request() { return { type: NOTE_GET_SINGLE_REQUEST } }
    function success(data) { return { type: NOTE_GET_SINGLE_SUCCESS, data } }
    function failure(error) { return { type: NOTE_GET_SINGLE_FAILURE, error } }
}

export function createNote(params) {

    return async dispatch => {
        dispatch(request());

        try {
            const result = await Sqlite.createNote(params);
            dispatch(success(result));
            return result;
        } catch (error) {
            dispatch(failure(error.toString()));
            throw error.toString()
        }
    };

    function request() { return { type: NOTE_CREATE_REQUEST } }
    function success(data) { return { type: NOTE_CREATE_SUCCESS, data, isRefresh: true } }
    function failure(error) { return { type: NOTE_CREATE_FAILURE, error } }
}

export function updateNote(id, params) {

    return async dispatch => {
        dispatch(request());

        try {
            const result = await Sqlite.updateNote(id, params);
            dispatch(success(result));
            return result;
        } catch (error) {
            dispatch(failure(error.toString()));
            throw error.toString()
        }
    };

    function request() { return { type: NOTE_UPDATE_REQUEST } }
    function success(data) { return { type: NOTE_UPDATE_SUCCESS, data } }
    function failure(error) { return { type: NOTE_UPDATE_FAILURE, error } }
}

export function deleteNote(id) {

    return async dispatch => {
        dispatch(request());

        try {
            const result = await Sqlite.deleteNoteTemporarily(id);
            dispatch(success());
            return result;
        } catch (error) {
            dispatch(failure(error.toString()));
            throw error.toString()
        }
    };

    function request() { return { type: NOTE_DELETE_REQUEST } }
    function success(data) { return { type: NOTE_DELETE_SUCCESS, data } }
    function failure(error) { return { type: NOTE_DELETE_FAILURE, error } }
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

export function resetNoteList() {
    return {
        type: NOTE_RESET
    }
}

export function synchronizeLocalToRemote() {

    return async dispatch => {
        //dispatch(request());

        try {
            const result = await SyncService.runSync(dispatch);
            dispatch(success(result));
            return result;
        } catch (error) {
            dispatch(failure(error.toString()));
            Toast.show({
                text: error.toString(),
                buttonText: 'Hide',
                type: "danger",
                duration: 5000
            });
        }
    };

    //function request() { return { type: NOTE_SYNC_REQUEST } }
    function success(data) { return { type: NOTE_SYNC_SUCCESS, data } }
    function failure(error) { return { type: NOTE_SYNC_FAILURE, error } }
}

export function synchronizeRemoteToLocal() {

    return async dispatch => {
        try {
            const result = await SyncService.runSync(dispatch, true);
            dispatch(success(result));
            return result;
        } catch (error) {
            dispatch(failure(error.toString()));
            Toast.show({
                text: error.toString(),
                buttonText: 'Hide',
                type: "danger",
                duration: 5000
            });
        }
    };

    function success(data) { return { type: NOTE_SYNC_SUCCESS, data } }
    function failure(error) { return { type: NOTE_SYNC_FAILURE, error} }
}