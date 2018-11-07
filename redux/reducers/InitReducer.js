import { INIT_FAILURE } from '../actions/InitAction'

export default function InitReducer (state = {
    errorInitializing: undefined
}, action) {
    switch (action.type) {
        case INIT_FAILURE:
            return Object.assign({}, state, {
                errorInitializing: action.error
            });
        default:
            return state
    }
}