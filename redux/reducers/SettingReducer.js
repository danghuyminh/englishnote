import {
   SETTING_SUCCESS, SETTING_REQUEST, SETTING_FAILURE, SETTING_UPDATE_SUCCESS
} from '../actions/SettingAction'

const initialState = {
    autoSync: true,
    isFetching: false
};

export function sqliteGetSetting (state = initialState, action) {
    switch (action.type) {
        case SETTING_REQUEST:
        case SETTING_FAILURE:
            return Object.assign({}, state, {
                isFetching: true
            });
        case SETTING_SUCCESS:
        case SETTING_UPDATE_SUCCESS:
            console.log('reducer <-------------------');
            console.log(action.data)
            return Object.assign({}, state, {
                ...action.data,
                isFetching: false,
            });
        case 'SETTING_CHANGE_AUTOSYNC':
            return Object.assign({}, state, {
                autoSync: action.value
            });
        default:
            return state
    }
}