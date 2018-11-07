import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Text, Body, Title, Button, Label } from 'native-base';

export default class SignUp extends React.Component {
    state = { email: '', password: '', errorMessage: null };

    handleSignUp = () => {
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((res) => {
                console.log('success');
                console.log(res)
            })
            .catch((error) => {
                // Handle Errors here.
                console.log(error.code)
                this.setState({
                    errorMessage: error.message
                })
            });
        console.log('handleSignUp')
    };

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>SignUp</Title>
                    </Body>
                </Header>
                <Content contentContainerStyle={styles.container}>
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
                        <Button full title="Sign In" style={{marginTop: 10}} onPress={this.handleSignUp}>
                            <Text>Register</Text>
                        </Button>
                        <Item inlineLabel>
                            <Label>Already have account?</Label>
                            <Button success style={{marginTop: 10}} onPress={() => this.props.navigation.navigate('Login')}>
                                <Text>Login</Text>
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
    }
});