import React from "react";
import NoteStackNavigator from "../NoteScreen/index";
import CategoryStackNavigator from "../CategoryScreen/index";

import { createStackNavigator } from "react-navigation";

export default (createStackNavigator(
    {
        NoteStack: NoteStackNavigator,
        CategoryStack: CategoryStackNavigator
    },
    {
        initialRouteName: "NoteStack",
        headerMode: "none"
    }
));