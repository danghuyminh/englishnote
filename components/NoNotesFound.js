import React from "react";
import {StyleSheet, View, Text} from "react-native";

export default class NoNotesFound extends React.Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <Text>No notes found!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
        paddingTop: 15
    }
});