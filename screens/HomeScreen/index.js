import React, { Component } from "react";
import HomeScreen from "./HomeScreen.js";
import NoteList from "../NoteScreen/NoteList.js";
import Profile from "../ProfileScreen/index";
import Logout from "../AuthScreen/Logout";
import SideBar from "../../components/SideBar/SideBar.js";
import { createDrawerNavigator } from "react-navigation";
const HomeScreenRouter = createDrawerNavigator(
    {
        Home: { screen: NoteList },
        Notes : { screen: NoteList },
        ProfileScreen: { screen: Profile },
        Logout: {screen: Logout}
    },
    {
        contentComponent: props => <SideBar {...props} />
    }
);
export default HomeScreenRouter;