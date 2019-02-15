import {UserService} from "../../services/UserService";

export const USER_LIST_REQUEST   = 'ASYNC_USER_LIST_REQUEST';
export const USER_LIST_SUCCESS   = 'ASYNC_USER_LIST_SUCCESS';
export const USER_LIST_FAILURE   = 'ASYNC_USER_LIST_FAILURE';

export function getAllUsers() {

    return async dispatch => {
        dispatch(request());
        try {
            const result = await UserService.getAllUsers();
            dispatch(success(result));
            return result;
        } catch (error) {
            dispatch(failure(error.toString()));
            throw error.toString()
        }
    };

    function request() { return { type: USER_LIST_REQUEST } }
    function success(data) { return { type: USER_LIST_SUCCESS, data } }
    function failure(error) { return { type: USER_LIST_FAILURE, error } }
}