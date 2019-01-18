import React from "react";
import HomeStackNavigator from "./StackNavigator";
import NoteStackNavigator from "../NoteScreen/index.js";
import ProfileNavigator from "../ProfileScreen/index";
import CategoryNavigator from "../CategoryScreen/index";
import Logout from "../AuthScreen/Logout";
import SideBar from "../../components/SideBar/SideBar.js";
import { createDrawerNavigator } from "react-navigation";
import {Icon} from "native-base";


const HomeScreenRouter = createDrawerNavigator(
    {
        Notes: {
            screen: NoteStackNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (<Icon type="FontAwesome" name="book" style={{ color: tintColor }} />),
            }
        },
        Categories: {
            screen: CategoryNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (<Icon type="MaterialCommunityIcons" size={24} name="filter-outline" style={{ color: tintColor }} />),
            }
        },
        Profile: {
            screen: ProfileNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (<Icon type="MaterialCommunityIcons" name="account-box-multiple" style={{ color: tintColor }} />),
            }
        },
        Settings: {
            screen: ProfileNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (<Icon type="MaterialCommunityIcons" name='cellphone-settings-variant' style={{ color: tintColor }} />),
            }
        },
        About: {
            screen: ProfileNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (<Icon type="MaterialCommunityIcons" name='information-outline' style={{ color: tintColor }} />),
            }
        },
        Logout: {
            screen: Logout,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (<Icon type="MaterialCommunityIcons" name='logout-variant' style={{ color: tintColor }} />),
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
        }
    }
);
export default HomeScreenRouter;