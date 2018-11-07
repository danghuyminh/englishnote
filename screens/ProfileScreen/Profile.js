import React from "react";
import { Alert } from "react-native";
import { Container, Header, Left, Body, Title, Card, CardItem, Content, Right, Icon, Button, Text } from "native-base";
import EditScreenOne from "./EditScreenOne.js";
import { NavigationActions } from 'react-navigation';

export default class Profile extends React.Component {
    componentDidMount() {
        let params = this.props.navigation.state.params;
        if (!params || !params.name) {
            Alert.alert("USER NOT found", 'Please go to Chat and select User 2');
        }
    }

    componentWillUnmount() {
        console.log('Profile Unmount')
        const setParamsAction = NavigationActions.setParams({
            params: undefined,
            key: 'Screen',
        });
        this.props.navigation.dispatch(setParamsAction);
    }

    render() {
        let params = this.props.navigation.state.params;

        return (
            <Container>
                <Content padder>
                    <Card>
                        <CardItem>
                            <Icon active name="paper-plane" />
                            {params ? (
                                <Text>{this.props.navigation.state.params.name}</Text>
                            ): (
                                <Text>Show User profiles here</Text>
                            )}
                            <Right>
                                <Icon name="close" />
                            </Right>
                        </CardItem>
                    </Card>
                    <Button full rounded primary
                            style={{ marginTop: 10 }}
                            onPress={() => this.props.navigation.navigate("EditScreenOne")}>
                        <Text>Goto EditScreen One</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}
Profile.navigationOptions = ({ navigation }) => ({
    header: (
        <Header>
            <Left>
                <Button transparent onPress={() => navigation.openDrawer()}>
                    <Icon name="menu" />
                </Button>
            </Left>
            <Body>
            <Title>Profile</Title>
            </Body>
            <Right />
        </Header>
    )
});