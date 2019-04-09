import React from "react";
import About from "./About.js";
import { createStackNavigator } from "react-navigation";
export default (DrawNav = createStackNavigator(
    {
        About
    },
    {
        headerMode: "none",
        initialRouteName: "About"
    }
));