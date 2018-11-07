import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import {initialize} from "../../redux/actions/InitAction";
import connect from "react-redux/es/connect/connect";

class Loading extends React.Component {

    componentDidMount() {
        this.props.initialize().then(() => {
            fire.auth().onAuthStateChanged(user => {
                this.props.navigation.navigate(user ? 'Main' : 'SignUp')
            })
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        const {errorInitializing} = this.props;

        return (
            <View style={styles.container}>
                {errorInitializing ? (
                    <React.Fragment>
                        <Text style={styles.errorAboveText}>The following error stopped the EnglishNote from starting:</Text>
                        <Text style={styles.errorMessage}>{errorInitializing}</Text>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Text>Loading</Text>
                        <ActivityIndicator size="large" />
                    </React.Fragment>
                )}
            </View>
        )
    }
}


function mapStateToProps (state) {
    const {errorInitializing} = state.InitReducer;
    return {
        errorInitializing
    }
}

function mapDispatchToProps (dispatch) {
    return {
        initialize: () => dispatch(initialize())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Loading)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorAboveText: {
        marginBottom: 20,
        marginLeft: 20,
        color: '#cc0066',
    },
    errorMessage: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#ff8080',
        padding: 15,
        marginLeft: 20,
        marginRight: 20,
    },
});