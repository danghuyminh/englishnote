import React from "react";
import Community from "./Community.js";
import CommunityView from "./CommunityView.js";
import CommunityNoteView from "./CommunityNoteView.js";

import { createStackNavigator } from "react-navigation";
import {fromTop} from "react-navigation-transitions";

export default (DrawNav = createStackNavigator(
    {
        Community,
        CommunityView,
        CommunityNoteView
    },
    {
        initialRouteName: "Community",
        transitionConfig: () => fromTop(),
    }
));