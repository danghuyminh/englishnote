import React from "react";
import { AppRegistry, Image, StatusBar, ImageBackground } from "react-native";
import { Container, Content, Text, List, ListItem, Button } from "native-base";
const routes = {"Home": "Home", "Notes": "Notes", "Profile": "Profile", "Logout": "Logout"};
export default class SideBar extends React.Component {
    render() {

        let user = auth.currentUser;

        return (
            <Container>
                <Content>
                    <Image
                        source={require('./logo.png')}
                        style={{
                            height: 120,
                            alignSelf: "stretch",
                            justifyContent: "center",
                            alignItems: "center"
                        }}/>
                    {user && (
                        <Button rounded light>
                            <Text>{user.displayName}</Text>
                        </Button>
                    )}
                    <List
                        dataArray={routes}
                        renderRow={data => {
                            return (
                                <ListItem
                                    button
                                    onPress={() => this.props.navigation.navigate(data)}>
                                    <Text>{data}</Text>
                                </ListItem>
                            );
                        }}
                    />
                </Content>
            </Container>
        );
    }
}