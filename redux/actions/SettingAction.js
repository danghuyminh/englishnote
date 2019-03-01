import {SettingService} from "../../services/SettingService";
import {Toast} from "native-base";

export const SETTING_REQUEST   = 'ASYNC_SETTING_REQUEST';
export const SETTING_SUCCESS   = 'ASYNC_SETTING_SUCCESS';
export const SETTING_FAILURE   = 'ASYNC_SETTING_FAILURE';

export const SETTING_UPDATE_REQUEST   = 'ASYNC_SETTING_UPDATE_REQUEST';
export const SETTING_UPDATE_SUCCESS   = 'ASYNC_SETTING_UPDATE_SUCCESS';
export const SETTING_UPDATE_FAILURE   = 'ASYNC_SETTING_UPDATE_FAILURE';

export const SETTING_GET_REQUEST   = 'ASYNC_SETTING_GET_REQUEST';
export const SETTING_GET_SUCCESS   = 'ASYNC_SETTING_GET_SUCCESS';
export const SETTING_GET_FAILURE   = 'ASYNC_SETTING_GET_FAILURE';

export const SETTING_CHANGE_AUTOSYNC   = 'SETTING_CHANGE_AUTOSYNC';

export function getSettings() {
    return async dispatch => {
        dispatch(request());
        try {
            const result = await SettingService.getSettings();
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

    function request() { return { type: SETTING_REQUEST } }
    function success(data) { return { type: SETTING_SUCCESS, data } }
    function failure(error) { return { type: SETTING_FAILURE, error } }
}

export function updateSetting(name, value) {
    return async dispatch => {
        dispatch(request());
        try {
            const result = await SettingService.updateSetting(name, value);
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

    function request() { return { type: SETTING_UPDATE_REQUEST } }
    function success(data) { return { type: SETTING_UPDATE_SUCCESS, data } }
    function failure(error) { return { type: SETTING_UPDATE_FAILURE, error } }
}

export function getSetting(name) {
    return async dispatch => {
        dispatch(request());
        try {
            const result = await SettingService.getSetting(name);
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

    function request() { return { type: SETTING_GET_REQUEST } }
    function success(data) { return { type: SETTING_GET_SUCCESS, data } }
    function failure(error) { return { type: SETTING_GET_FAILURE, error } }
}

export function updateAutoSync(value) {
    return {
        type: SETTING_CHANGE_AUTOSYNC,
        value
    }
}