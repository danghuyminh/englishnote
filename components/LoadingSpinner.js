import React from "react";
import {connect} from "react-redux/";
import {StyleSheet, View, Text} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

export default class LoadingSpinner extends React.Component {
    render() {
        const {visible, title} = this.props;
        return (
            <Spinner
                visible={visible}
                textContent={`${title}...`}
                textStyle={StyleSheet.flatten(styles.spinnerTextStyle)}
                color="green"
            />
        );
    }
}

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: 'green'
    },
});