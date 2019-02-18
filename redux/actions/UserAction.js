import {UserService} from "../../services/UserService";
import {Toast} from "native-base";

export const USER_LIST_REQUEST   = 'ASYNC_USER_LIST_REQUEST';
export const USER_LIST_SUCCESS   = 'ASYNC_USER_LIST_SUCCESS';
export const USER_LIST_FAILURE   = 'ASYNC_USER_LIST_FAILURE';

export const USER_NOTES_REQUEST   = 'ASYNC_USER_NOTES_REQUEST';
export const USER_NOTES_SUCCESS   = 'ASYNC_USER_NOTES_SUCCESS';
export const USER_NOTES_FAILURE   = 'ASYNC_USER_NOTES_FAILURE';
export const USER_NOTES_MORE_SUCCESS   = 'ASYNC_USER_NOTES_MORE_SUCCESS';

export function getAllUsers() {
    return async dispatch => {
        dispatch(request());
        try {
            const result = await UserService.getAllUsers();
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

    function request() { return { type: USER_LIST_REQUEST } }
    function success(data) { return { type: USER_LIST_SUCCESS, data } }
    function failure(error) { return { type: USER_LIST_FAILURE, error } }
}

export function getRemoteNotes(uid, nextQuery) {
    return async dispatch => {
        dispatch(request());
        try {
            const {notes, next}  = await UserService.getRemoteNotes(uid, nextQuery);
            return dispatch(success(notes, next));
        } catch (error) {
            dispatch(failure(error.toString()));
            Toast.show({
                text: 'Could not load more. Please check the internet connection.',
                buttonText: 'Hide',
                type: "danger",
                duration: 5000
            });
        }
    };

    function request() { return { type: USER_NOTES_REQUEST, isLoadMore: (nextQuery !== undefined) } }
    function success(notes, next) { return { type: (nextQuery !== undefined) ? USER_NOTES_MORE_SUCCESS : USER_NOTES_SUCCESS, notes, next, isLoadMore: (nextQuery !== undefined) } }
    function failure(error) { return { type: USER_NOTES_FAILURE, error } }
}