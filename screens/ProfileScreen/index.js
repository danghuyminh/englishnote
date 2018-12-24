import React from "react";
import Profile from "./Profile.js";
import EditScreenOne from "./EditScreenOne.js";
import EditScreenTwo from "./EditScreenTwo.js";
import { createStackNavigator } from "react-navigation";
export default (DrawNav = createStackNavigator(
    {
        Profile: Profile,
        EditScreenOne: EditScreenOne,
        EditScreenTwo: EditScreenTwo,
    },
    {
        initialRouteName: "Profile"
    }
));