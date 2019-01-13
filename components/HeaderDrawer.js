import React, {PureComponent} from "react";
import {Body, Button, Header, Icon, Left, Right, Title} from "native-base";
import {StyleSheet} from "react-native";
import config from "../config";

export default class HeaderDrawer extends PureComponent {

    render() {
        const {navigation, title} = this.props;

        return (
            <Header style={styles.headerWrapper}>
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
                <Right>
                    <Button transparent onPress={() => this.props.navigation.navigate('NoteList')}>
                        <Icon type="FontAwesome" name="home" />
                    </Button>
                </Right>
            </Header>
        );
    }
}

const styles = StyleSheet.create({
    headerWrapper: {
        backgroundColor: config.themeColor,
    }
});