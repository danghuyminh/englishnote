import React from "react";
import NoteList from "./NoteList.js";
import NoteCategory from "./NoteCategory.js";
import NoteCreate from "./NoteCreate";
import NoteUpdate from "./NoteUpdate";

import { createStackNavigator } from "react-navigation";

export default (createStackNavigator(
    {
        NoteList,
        NoteCategory,
        NoteCreate,
        NoteUpdate
    },
    {
        initialRouteName: "NoteList",
        headerMode: 'screen'
    }
));