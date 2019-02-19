import React from "react";
import Profile from "./Profile.js";
import { createStackNavigator } from "react-navigation";
export default (DrawNav = createStackNavigator(
    {
        Profile: Profile
    },
    {
        headerMode: "none",
        initialRouteName: "Profile"
    }
));