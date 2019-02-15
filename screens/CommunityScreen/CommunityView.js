import React from "react";
import {
    Text
} from "native-base";
import { connect } from 'react-redux'
import HeaderGoBack from "../../components/HeaderGoBack";
import {View} from "react-native";

class CommunityView extends React.Component {

    state = {
        items: undefined,
        isKeyboardOpened: false,
    };

    static navigationOptions = ({ navigation }) => ({header: <HeaderGoBack navigation={navigation} title='Community' />});

    componentWillMount() {

    }

    render() {
        const {uid} = this.props.navigation.state.params;

        return (
            <View>
                <Text>Community view content</Text>
                <Text>{uid}</Text>
            </View>
        );
    }
}

function mapStateToProps (state) {

    return {

    }
}

function mapDispatchToProps (dispatch) {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommunityView)