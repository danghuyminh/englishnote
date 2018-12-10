import AuthReducer from "./AuthReducer";
import AsyncReducer from "./AsyncReducer";
import InitReducer from "./InitReducer";
import * as NoteReducers from "./NoteReducer";
import * as CategoryReducers from "./CategoryReducer";

const reducers = {
    AuthReducer,
    InitReducer,
    AsyncReducer,
    ...CategoryReducers,
    ...NoteReducers
};

export default reducers