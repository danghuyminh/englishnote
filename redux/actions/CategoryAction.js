import {CategoryService} from "../../services/CategoryService";

export const CATEGORY_CREATE_REQUEST   = 'ASYNC_CATEGORY_CREATE_REQUEST';
export const CATEGORY_CREATE_SUCCESS   = 'ASYNC_CATEGORY_CREATE_SUCCESS';
export const CATEGORY_CREATE_FAILURE   = 'ASYNC_CATEGORY_CREATE_FAILURE';

export const CATEGORY_UPDATE_REQUEST   = 'ASYNC_CATEGORY_UPDATE_REQUEST';
export const CATEGORY_UPDATE_SUCCESS   = 'ASYNC_CATEGORY_UPDATE_SUCCESS';
export const CATEGORY_UPDATE_FAILURE   = 'ASYNC_CATEGORY_UPDATE_FAILURE';

export const CATEGORY_DELETE_REQUEST   = 'ASYNC_CATEGORY_DELETE_REQUEST';
export const CATEGORY_DELETE_SUCCESS   = 'ASYNC_CATEGORY_DELETE_SUCCESS';
export const CATEGORY_DELETE_FAILURE   = 'ASYNC_CATEGORY_DELETE_FAILURE';

export const CATEGORY_GET_REQUEST   = 'ASYNC_CATEGORY_GET_REQUEST';
export const CATEGORY_GET_SUCCESS   = 'ASYNC_CATEGORY_GET_SUCCESS';
export const CATEGORY_GET_FAILURE   = 'ASYNC_CATEGORY_GET_FAILURE';

export const CATEGORY_GET_SINGLE_REQUEST   = 'ASYNC_CATEGORY_GET_SINGLE_REQUEST';
export const CATEGORY_GET_SINGLE_SUCCESS   = 'ASYNC_CATEGORY_GET_SINGLE_SUCCESS';
export const CATEGORY_GET_SINGLE_FAILURE   = 'ASYNC_CATEGORY_GET_SINGLE_FAILURE';

export const CATEGORY_SELECT   = 'CATEGORY_SELECT';

export function createCategory(title) {

    return async dispatch => {
        dispatch(request());

        try {
            const result = await CategoryService.createCategory(title);
            dispatch(success(result));
            return result;
        } catch (error) {
            dispatch(failure(error.toString()));
            throw error.toString()
        }
    };

    function request() { return { type: CATEGORY_CREATE_REQUEST } }
    function success(data) { return { type: CATEGORY_CREATE_SUCCESS, data } }
    function failure(error) { return { type: CATEGORY_CREATE_FAILURE, error } }
}

export function updateCategory(values) {

    return async dispatch => {
        dispatch(request());

        try {
            const result = await CategoryService.updateCategory(values);
            dispatch(success(result));
            return result;
        } catch (error) {
            dispatch(failure(error.toString()));
            throw error.toString()
        }
    };

    function request() { return { type: CATEGORY_UPDATE_REQUEST } }
    function success(data) { return { type: CATEGORY_UPDATE_SUCCESS, data } }
    function failure(error) { return { type: CATEGORY_UPDATE_FAILURE, error } }
}

export function deleteCategory(values) {

    return async dispatch => {
        dispatch(request());
        try {
            const result = await CategoryService.deleteCategory(values);
            dispatch(success(result));
            return result;
        } catch (error) {
            dispatch(failure(error.toString()));
            throw error.toString()
        }
    };

    function request() { return { type: CATEGORY_DELETE_REQUEST } }
    function success(data) { return { type: CATEGORY_DELETE_SUCCESS, data } }
    function failure(error) { return { type: CATEGORY_DELETE_FAILURE, error } }
}

export function getCategory(id) {

    return async dispatch => {
        dispatch(request());
        try {
            const result = await CategoryService.getCategory(id);
            dispatch(success(result));
            return result;
        } catch (error) {
            dispatch(failure(error.toString()));
            throw error.toString()
        }
    };

    function request() { return { type: CATEGORY_GET_SINGLE_REQUEST } }
    function success(data) { return { type: CATEGORY_GET_SINGLE_SUCCESS, data } }
    function failure(error) { return { type: CATEGORY_GET_SINGLE_FAILURE, error } }
}

export function getCategories(params) {

    const isFirstLoading = params && params.isFirstLoading;

    return async dispatch => {
        dispatch(request());

        try {
            const result = await CategoryService.getCategories(params);
            dispatch(success(result));
            return result;
        } catch (error) {
            dispatch(failure(error.toString()));
            throw error.toString()
        }
    };

    function request() { return { type: CATEGORY_GET_REQUEST, isFirstLoading } }
    function success(data) { return { type: CATEGORY_GET_SUCCESS, data, isFirstLoading } }
    function failure(error) { return { type: CATEGORY_GET_FAILURE, error, isFirstLoading } }
}


export function selectCategory(id, name) {

   return {
       type: CATEGORY_SELECT,
       categoryId: id,
       categoryName: name
   }
}