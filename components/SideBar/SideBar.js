import React from "react";
import { AppRegistry, Image, StatusBar, ImageBackground } from "react-native";
import { Container, Content, Text, List, ListItem, Button } from "native-base";
const routes = {"Home": "Home", "Notes": "Notes", "Category": "Categories", "Profile": "Profile", "Logout": "Logout"};

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
                            width: 320,

                        }}/>
                    {user && (
                        <Button rounded light>
                            <Text>{user.displayName}</Text>
                        </Button>
                    )}
                    <List
                        keyboardShouldPersistTaps='always'
                        /*dataArray={this.props.items}*/
                       /* renderRow={data => {
                            return (
                                <ListItem
                                    button
                                    onPress={() => {this.props.navigation.navigate(data.routes[0].routeName)}}>
                                    <Text>{data.routeName}</Text>
                                </ListItem>
                            );
                        }}*/
                    >
                        <ListItem
                            button
                            onPress={() => {this.props.navigation.navigate('CategoryList')}}>
                            <Text>Profile</Text>
                        </ListItem>
                        <ListItem
                            button
                            onPress={() => {this.props.navigation.navigate('NoteList')}}>
                            <Text>Notes</Text>
                        </ListItem>
                        <ListItem
                            button
                            onPress={() => {this.props.navigation.navigate('CategoryList')}}>
                            <Text>Categories</Text>
                        </ListItem>
                        <ListItem
                            button
                            onPress={() => {this.props.navigation.navigate('CategoryList')}}>
                            <Text>Settings</Text>
                        </ListItem>
                        <ListItem
                            button
                            onPress={() => {this.props.navigation.navigate('CategoryList')}}>
                            <Text>About</Text>
                        </ListItem>
                        <ListItem
                            button
                            onPress={() => {this.props.navigation.navigate('Logout')}}>
                            <Text>Logout</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}