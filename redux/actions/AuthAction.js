import {AuthService} from "../../services/AuthService";

export const AUTH_REQUEST   = 'ASYNC_AUTH_REQUEST';
export const AUTH_SUCCESS   = 'ASYNC_AUTH_SUCCESS';
export const AUTH_FAILURE   = 'ASYNC_AUTH_FAILURE';


export function loginWithGoogle() {

    return async dispatch => {
        dispatch(request());
        try {
            const data = await AuthService.loginWithGoogle();
            dispatch(success(data));
            return data;
        } catch (error) {
            dispatch(failure(error));
            throw error;
        }

    };

    function request() { return { type: AUTH_REQUEST } }
    function success(data) { return { type: AUTH_SUCCESS, data } }
    function failure(error) { return { type: AUTH_FAILURE, error } }
}

export function loginWithFacebook() {

    return async dispatch => {
        dispatch(request());
        try {
            const data = await AuthService.loginWithFacebook();
            dispatch(success(data));
            return data;
        } catch (error) {
            dispatch(failure(error));
            throw error;
        }

    };

    function request() { return { type: AUTH_REQUEST } }
    function success(data) { return { type: AUTH_SUCCESS, data } }
    function failure(error) { return { type: AUTH_FAILURE, error } }
}