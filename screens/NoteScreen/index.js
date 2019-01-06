import React from "react";
import NoteList from "./NoteList.js";
import NoteCategory from "./NoteCategory.js";
import { createStackNavigator } from "react-navigation";

export default (createStackNavigator(
    {
        NoteList,
        NoteCategory,
    },
    {
        initialRouteName: "NoteList",
        headerMode: 'screen'
    }
));