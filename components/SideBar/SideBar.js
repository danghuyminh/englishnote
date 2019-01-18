import React from "react";
import { Image, ScrollView } from "react-native";
import { Container, Content, Text, Button } from "native-base";
import CustomDrawerNavigatorItems from "./SidebarItem";

export default class SideBar extends React.Component {
    render() {
        let user = auth.currentUser;
        return (
            <Container>
                <Content>
                    <Image
                        source={require('./logo.png')}

                        style={{
                            height: 160,
                            width: 280,

                        }}/>
                    {user && (
                        <Button rounded light>
                            <Text>{user.displayName}</Text>
                        </Button>
                    )}
                    <ScrollView keyboardShouldPersistTaps='always'>
                        <CustomDrawerNavigatorItems {...this.props} />
                    </ScrollView>
                </Content>
            </Container>
        );
    }
}