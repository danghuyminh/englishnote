import AuthReducer from "./AuthReducer";
import AsyncReducer from "./AsyncReducer";
import InitReducer from "./InitReducer";
import * as NoteReducers from "./NoteReducer";

const reducers = {
    AuthReducer,
    InitReducer,
    AsyncReducer,
    ...NoteReducers
};

export default reducers