import AuthReducer from "./AuthReducer";
import AsyncReducer from "./AsyncReducer";
import InitReducer from "./InitReducer";
import * as NoteReducers from "./NoteReducer";
import * as CategoryReducers from "./CategoryReducer";
import * as UserReducers from "./UserReducer";

const reducers = {
    AuthReducer,
    InitReducer,
    AsyncReducer,
    ...CategoryReducers,
    ...NoteReducers,
    ...UserReducers
};

export default reducers