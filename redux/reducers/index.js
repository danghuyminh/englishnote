import AuthReducer from "./AuthReducer";
import AsyncReducer from "./AsyncReducer";
import InitReducer from "./InitReducer";
import * as NoteReducers from "./NoteReducer";
import * as CategoryReducers from "./CategoryReducer";
import * as UserReducers from "./UserReducer";
import * as SettingReducers from "./SettingReducer";

const reducers = {
    AuthReducer,
    InitReducer,
    AsyncReducer,
    ...CategoryReducers,
    ...NoteReducers,
    ...UserReducers,
    ...SettingReducers
};

export default reducers