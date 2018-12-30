import React from "react";
import {Body, Button, Header, Icon, Left, Right, Title} from "native-base";
import { blur } from 'redux-form';
import connect from "react-redux/es/connect/connect";

class HeaderDrawer extends React.Component {

    render() {
        const {navigation, title} = this.props;

        return (
            <Header>
                <Left>
                    <Button
                        transparent
                        onPress={() => { navigation.openDrawer()}}>
                        <Icon name="menu" />
                    </Button>
                </Left>
                <Body>
                    <Title>{title}</Title>
                </Body>
                <Right />
            </Header>
        );
    }
}

function mapDispatchToProps (dispatch) {
    return {
        blurForm: () => {console.log('blurForm2'); dispatch(blur('form-note-create', 'title', 'draft'))}
    }
}

export default connect(
    null,
    mapDispatchToProps
)(HeaderDrawer)