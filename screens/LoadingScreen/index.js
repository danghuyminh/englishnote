import React from 'react'
import { createSwitchNavigator } from 'react-navigation'

// import the different screens
import Loading from './LoadingScreen'
import SignUp from '../AuthScreen/Signup'
import Login from '../AuthScreen/Login'
import Main from '../HomeScreen/index'

// create our app's navigation stack
const InitScreen = createSwitchNavigator(
    {
        Loading,
        SignUp,
        Login,
        Main
    },
    {
        initialRouteName: 'Loading'
    }
)

export default InitScreen