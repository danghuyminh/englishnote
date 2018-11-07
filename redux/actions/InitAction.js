import {Sqlite} from "../../services/DbService";

export const INIT_REQUEST   = 'ASYNC_INIT_REQUEST';
export const INIT_SUCCESS   = 'ASYNC_INIT_SUCCESS';
export const INIT_FAILURE   = 'ASYNC_INIT_FAILURE';


export function initialize() {

    return async dispatch => {
        dispatch(request());

        try {
            const result = await Sqlite.initialize()
            dispatch(success());
            return result;
        } catch (error) {
            dispatch(failure(error.toString()));
            throw error.toString()
        }

    };

    function request() { return { type: INIT_REQUEST } }
    function success(data) { return { type: INIT_SUCCESS, data } }
    function failure(error) { return { type: INIT_FAILURE, error } }
}
