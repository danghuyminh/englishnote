import React from "react";
import {Body, Button, Header, Icon, Left, Right, Title} from "native-base";
import {StyleSheet} from "react-native";
import config from '../config';

export default class HeaderGoBack extends React.Component {
    render() {
        const {navigation, title} = this.props;
        return (
            <Header style={styles.headerWrapper}>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" />
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

const styles = StyleSheet.create({
    headerWrapper: {
        backgroundColor: config.themeColor
    },
});