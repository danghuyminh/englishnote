import React from 'react'
import { StyleSheet, View } from 'react-native'
import {Body, Container, Content, Form, Header, Title, Button, Text, Icon} from "native-base";
import {loginWithGoogle, loginWithFacebook} from '../../redux/actions/AuthAction'
import Spinner from 'react-native-loading-spinner-overlay';
import connect from "react-redux/es/connect/connect";
import {UserService} from "../../services/UserService";

class Login extends React.Component {
    state = { email: '', password: '', errorMessage: null };

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

    handleLoginWithFacebook = async () => {
        try {
            await this.props.loginWithFacebook();
            await this.storeUserInfo();
        } catch (error) {
            console.log(error);
            this.setState({
                errorMessage: error.toString()
            })
        }
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
                    <Title>Login</Title>
                    </Body>
                </Header>
                <Content contentContainerStyle={styles.container}>
                    <Spinner
                        visible={isFetching}
                        textContent={'Loading...'}
                        textStyle={StyleSheet.flatten(styles.spinnerTextStyle)}
                    />
                    <Form>

                    <Text>
                        {this.state.errorMessage}
                    </Text>

                   {/* <Item>
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
                    </Item>*/}
                   {/* <Button full style={{marginTop: 10}} onPress={this.handleLogin}>
                        <Text>Login</Text>
                    </Button>*/}
                    <View style={{padding: '5%'}}>
                        <Button full rounded style={{marginTop: 10}} onPress={this.handleLoginWithFacebook}>
                            <Icon type="FontAwesome" name="facebook" />
                            <Text>Login with Facebook</Text>
                        </Button>
                        <Button full rounded danger style={{marginTop: 10}} onPress={this.handleLoginWithGoogle}>
                            <Icon type="FontAwesome" name="google" />
                            <Text>Login with Google</Text>
                        </Button>
                    </View>
                    {/*<Item inlineLabel>
                        <Label>Don't have an account?</Label>
                        <Button success style={{marginTop: 10}} onPress={() => this.props.navigation.navigate('SignUp')}>
                            <Text>SignUp</Text>
                        </Button>
                    </Item>*/}
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
        loginWithGoogle: () => dispatch(loginWithGoogle()),
        loginWithFacebook: () => dispatch(loginWithFacebook()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)