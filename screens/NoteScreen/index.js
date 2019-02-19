import React from "react";
import NoteList from "./NoteList.js";
import NoteCategory from "./NoteCategory.js";
import NoteCreate from "./NoteCreate";
import NoteUpdate from "./NoteUpdate";
import NoteView from "./NoteView";

import { createStackNavigator } from "react-navigation";
import {fromBottom} from "react-navigation-transitions";

export default (createStackNavigator(
    {
        NoteList,
        NoteCategory,
        NoteCreate,
        NoteUpdate,
        NoteView
    },
    {
        initialRouteName: "NoteList",
        headerMode: 'screen',
        transitionConfig: () => fromBottom(),
    }
));