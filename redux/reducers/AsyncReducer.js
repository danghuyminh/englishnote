export default function AsyncReducer (state = {
    isFetching: false
}, action) {
    if (action.type.includes('ASYNC_')) {
        return Object.assign({}, state, {
            isFetching: action.type.includes('_REQUEST'),
            errorMessage: action.type.includes('_FAILURE') ? action.error : undefined
        });
    }
    return state;
}