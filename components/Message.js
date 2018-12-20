import React from "react";
import {connect} from "react-redux/";
import {StyleSheet, View, Text} from "react-native";

class Message extends React.Component {

    render() {

        const {hasMessage, message} = this.props;

        return (
            <View>
                {hasMessage && (
                    <View style={styles.errorWrapper}>
                        <Text style={styles.errorText}>{message}</Text>
                    </View>
                )}
            </View>
        );
    }
}


function mapStateToProps (state) {
    const {errorMessage, successMessage} = state.AsyncReducer;
    return {
        message: errorMessage ? errorMessage : successMessage,
        hasMessage: (errorMessage || successMessage),
    }
}

export default connect(
    mapStateToProps,
    null
)(Message)

const styles = StyleSheet.create({
    errorText: {
        marginBottom: 20,
        marginLeft: 20,
        color: '#cc0066',
    },
    errorWrapper: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#ff8080',
        padding: 15,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 30
    }
});