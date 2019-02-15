import React from 'react'
import { StyleSheet } from 'react-native'
import {Body, Container, Content, Form, Header, Input, Item, Label, Title, Button, Text} from "native-base";
import {loginWithGoogle} from '../../redux/actions/AuthAction'
import Spinner from 'react-native-loading-spinner-overlay';
import connect from "react-redux/es/connect/connect";
import {UserService} from "../../services/UserService";

class Login extends React.Component {
    state = { email: '', password: '', errorMessage: null }

    handleLogin = () => {
        auth.signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
            this.setState({
                errorMessage: error.message
            });
        });
    };

    handleLoginWithGoogle = async () => {
        await this.props.loginWithGoogle();
        await this.storeUserInfo();
    };

    storeUserInfo = async () => {
        await UserService.updateUserInfo();
    };

    render() {
        const {isFetching} = this.props;
        console.log('fetching---');

        return (
            <Container>
                <Header>
                    <Body>
                    <Title>Login2</Title>
                    </Body>
                </Header>
                <Content contentContainerStyle={styles.container}>
                    <Spinner
                        visible={isFetching}
                        textContent={'Loading...'}
                        textStyle={StyleSheet.flatten(styles.spinnerTextStyle)}
                    />
                    <Form>
                        <Item>
                            <Text>
                                {this.state.errorMessage}
                            </Text>
                        </Item>
                        <Item>
                            <Input placeholder="Email"
                                   onChangeText={email => this.setState({ email })}
                                   value={this.state.email}
                            />
                        </Item>
                        <Item last>
                            <Input placeholder="Password"
                                   secureTextEntry={true}
                                   onChangeText={password => this.setState({ password })}
                                   value={this.state.password}
                            />
                        </Item>
                        <Button full style={{marginTop: 10}} onPress={this.handleLogin}>
                            <Text>Login</Text>
                        </Button>
                        <Button full style={{marginTop: 10}} onPress={this.handleLoginWithGoogle}>
                            <Text>Login with Google</Text>
                        </Button>
                        <Item inlineLabel>
                            <Label>Don't have an account?</Label>
                            <Button success style={{marginTop: 10}} onPress={() => this.props.navigation.navigate('SignUp')}>
                                <Text>SignUp</Text>
                            </Button>
                        </Item>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
});

function mapStateToProps (state) {
    const {isFetching} = state.AsyncReducer;
    return {
        isFetching
    }
}

function mapDispatchToProps (dispatch) {
    return {
        loginWithGoogle: () => dispatch(loginWithGoogle())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)