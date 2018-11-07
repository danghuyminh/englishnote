export default function AsyncReducer (state = {
    isFetching: false
}, action) {
    if (action.type.includes('ASYNC_')) {
        return Object.assign({}, state, {
            isFetching: action.type.includes('_REQUEST')
        });
    }
    return state;
}