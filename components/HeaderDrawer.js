import React from "react";
import {Body, Button, Header, Icon, Left, Right, Title} from "native-base";


export default class HeaderDrawer extends React.Component {

    render() {

        return (
            <Header>
                <Left>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.openDrawer()}>
                        <Icon name="menu" />
                    </Button>
                </Left>
                <Body>
                    <Title>Category Screen</Title>
                </Body>
                <Right />
            </Header>
        );
    }
}