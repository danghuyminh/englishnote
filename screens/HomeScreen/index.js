import React from "react";
import NoteStackNavigator from "../NoteScreen/index.js";
import ProfileNavigator from "../ProfileScreen/index";
import CommunityNavigator from "../CommunityScreen/index";
import CategoryNavigator from "../CategoryScreen/index";
import SettingNavigator from "../SettingScreen/index";
import Logout from "../AuthScreen/Logout";
import SideBar from "../../components/SideBar/SideBar.js";
import { createDrawerNavigator } from "react-navigation";
import {Icon} from "native-base";

const HomeScreenRouter = createDrawerNavigator(
    {
        Notes: {
            screen: NoteStackNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (<Icon type="FontAwesome" name="book" style={{ color: tintColor, width: 32 }} />),
            }
        },
        Categories: {
            screen: CategoryNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (<Icon type="MaterialCommunityIcons" size={24} name="filter-outline" style={{ color: tintColor, width: 32 }} />),
            }
        },
        Profile: {
            screen: ProfileNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (<Icon type="MaterialCommunityIcons" name="account-box-multiple" style={{ color: tintColor, width: 32 }} />),
            }
        },
        Community: {
            screen: CommunityNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (<Icon type="MaterialCommunityIcons" name='account-group' style={{ color: tintColor, width: 32 }} />),
            }
        },
        Settings: {
            screen: SettingNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (<Icon type="MaterialCommunityIcons" name='cellphone-settings-variant' style={{ color: tintColor, width: 32 }} />),
            }
        },
        About: {
            screen: ProfileNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (<Icon type="MaterialCommunityIcons" name='information-outline' style={{ color: tintColor, width: 32 }} />),
            }
        },
        Logout: {
            screen: Logout,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (<Icon type="MaterialCommunityIcons" name='logout-variant' style={{ color: tintColor, width: 32 }} />),
            }
        }
    },
    {
        contentComponent: props => <SideBar {...props} />,
        headerMode: "none",
        drawerWidth: 240,
        renderIcon: ({ route, index, focused, tintColor: color }) => {
            return <Icon type="FontAwesome" name="home" />;
        },
        icon: <Icon type="FontAwesome" name="home" />,
        contentOptions: {
            activeBackgroundColor: '#015947',
            activeTintColor: '#fff',
            icon: <Icon type="FontAwesome" name="home" />,
            renderIcon: ({ route, index, focused, tintColor: color }) => {
                return <Icon type="FontAwesome" name="home" />;
            }
        },
        initialRouteName: "Notes"
    }
);
export default HomeScreenRouter;