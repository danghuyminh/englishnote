import React from "react";
import {
    Body, Thumbnail, Icon,
    Container,
    Content, List, ListItem, Right, Left,
    Text
} from "native-base";
import { connect } from 'react-redux'
import {FlatList, View} from "react-native";
import {getAllUsers} from "../../redux/actions/UserAction"
import HeaderDrawer from "../../components/HeaderDrawer";

class Community extends React.Component {

    state = {
        items: undefined,
        isKeyboardOpened: false,
    };

    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    componentWillMount() {
        this.props.getAllUsers();
    }

    onItemClick = (id) => {
        this.props.navigation.navigate('CommunityView', {
            uid: id
        });
    };

    onRefresh = () => {
        this.props.getAllUsers();
    };

    render() {
        const {isFetching = false, users} = this.props;

        return (
            <Container>
                <HeaderDrawer title='Community' navigation={this.props.navigation}/>
                <Content padder>
                    <List>
                        <FlatList
                            data={users}
                            renderItem={this._renderItem}
                            onRefresh={this.onRefresh}
                            refreshing={isFetching}
                            keyExtractor = {(item) => item.id.toString()}
                            ListEmptyComponent={() => {
                                return (
                                    <View>
                                        <Text>No users found!</Text>
                                    </View>
                                )
                            }}
                        />
                    </List>
                </Content>
            </Container>
        );
    }

    _renderItem = (data) => {
        return (
            <ListItem avatar onPress={() => this.onItemClick(data.item.id)}>
                <Left>
                    <Thumbnail source={{ uri: data.item.photoURL }} />
                </Left>
                <Body>
                    <Text>{data.item.name}</Text>
                    <Text note numberOfLines={1}>{data.item.email}</Text>
                </Body>
                <Right style={{height:67.5}} >
                    <Icon name="arrow-forward" />
                </Right>
            </ListItem>
        )
    }
}

function mapStateToProps (state) {
    const {users} = state.firebaseGetUsers;
    const {isFetching} = state.AsyncReducer;

    return {
        users,
        isFetching
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getAllUsers: () => dispatch(getAllUsers())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Community)