import React from "react";
import Community from "./Community.js";
import CommunityView from "./CommunityView.js";
import CommunityNoteView from "./CommunityNoteView.js";

import { createStackNavigator } from "react-navigation";

export default (DrawNav = createStackNavigator(
    {
        Community,
        CommunityView,
        CommunityNoteView
    },
    {
        initialRouteName: "Community"
    }
));