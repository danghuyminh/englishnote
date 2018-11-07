import React from "react";
import {
    Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text, Input,
    Card, CardItem, Item
} from "native-base";
import { connect } from 'react-redux'
import { createNote } from "../../redux/actions/NoteAction"
import AddNoteForm from "./AddNoteForm";
import {Sqlite} from "../../services/DbService";

class HomeScreen extends React.Component {

    state = {
        items: undefined
    };

    componentDidMount() {
        console.log('Home Did Mount')
    }

    componentWillUnmount() {
        console.log('Home Unmount')
    }

    handleSubmit = async (values) => {
        console.log(values)
        await this.props.createNote(values);
        //const notes = await Sqlite.selectNotes();
        this.props.navigation.navigate("Notes")
    };

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                    <Title>HomeScreen</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Card>
                        <CardItem>
                            <Body>
                            <Text>Add your note</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <AddNoteForm onSubmit={this.handleSubmit} />
                    <Button full rounded dark
                            style={{ marginTop: 10 }}
                            onPress={() => this.props.navigation.navigate("Chat")}>
                        <Text>View Notes</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps (state) {
    return {

    }
}

function mapDispatchToProps (dispatch) {
    return {
        createNote: (values) => dispatch(createNote(values))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen)