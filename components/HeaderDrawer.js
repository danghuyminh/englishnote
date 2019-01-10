import React, {PureComponent} from "react";
import {Body, Button, Header, Icon, Left, Right, Title} from "native-base";

export default class HeaderDrawer extends PureComponent {

    render() {
        console.log('header drwaer render')
        const {navigation, title} = this.props;

        return (
            <Header style={{elevation: 4}}>
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