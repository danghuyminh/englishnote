import React from "react";
import HomeStackNavigator from "./StackNavigator";
import NoteList from "../NoteScreen/index.js";
import Profile from "../ProfileScreen/index";
import Category from "../CategoryScreen/index";
import Logout from "../AuthScreen/Logout";
import SideBar from "../../components/SideBar/SideBar.js";
import { createDrawerNavigator } from "react-navigation";
const HomeScreenRouter = createDrawerNavigator(
    {
        HomePage: { screen: HomeStackNavigator },
        Logout: {screen: Logout}
    },
    {
        contentComponent: props => <SideBar {...props} />,
        headerMode: "none",
        /*drawerWidth: 250*/
    }
);
export default HomeScreenRouter;