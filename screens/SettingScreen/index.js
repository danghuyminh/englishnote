import React from "react";
import Setting from "./Setting.js";
import { createStackNavigator } from "react-navigation";
export default (DrawNav = createStackNavigator(
    {
        Setting
    },
    {
        headerMode: "none",
        initialRouteName: "Setting"
    }
));