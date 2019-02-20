import React from "react";
import {Image, ScrollView, View} from "react-native";
import {Container, Content, Text, Icon} from "native-base";
import CustomDrawerNavigatorItems from "./SidebarItem";
import Config from "../../config";

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
                        <View rounded transparent style={{marginTop: 3, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Icon active name="contact" style={{color: '#0cb787', fontSize: 32, marginLeft: -10, marginRight: 10}} />
                            <Text style={{color: Config.themeColor}}>{user.displayName}</Text>
                        </View>
                    )}
                    <ScrollView keyboardShouldPersistTaps='always'>
                        <CustomDrawerNavigatorItems {...this.props} />
                    </ScrollView>
                </Content>
            </Container>
        );
    }
}