import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'

export default class Logout extends React.Component {

   componentDidMount() {
       auth.signOut()
           .then(function() {
               this.props.navigation.navigate('Main')
           })
           .catch(function(error) {
               // An error happened
           });
   }

    render() {
        return (
            <View>
                <Text>Logging out...</Text>
            </View>
        )
    }
}