import React from "react";
import {
    Container, Button, Body, Content, Text, Card, CardItem, Toast
} from "native-base";
import { connect } from 'react-redux'
import { createNote } from "../../redux/actions/NoteAction"
import NoteForm from "./NoteForm";
import HeaderGoBack from "../../components/HeaderGoBack";
import {getCategories} from "../../redux/actions/CategoryAction";

class NoteCreate extends React.Component {

    state = {
        items: undefined
    };

    static navigationOptions = ({ navigation }) => ({header: <HeaderGoBack navigation={navigation} title='Create Note' />});

    componentWillMount() {
        console.log('NoteScreen Will Mount');
        try {
            this.props.getCategories();
        } catch (error) {
            // throw error here
        }
    }

    componentWillUnmount() {
        console.log('NoteScreen Will Unmount');
    }

    handleSubmit = async (values) => {
        console.log(values)
        await this.props.createNote(values);
        Toast.show({
            text: "Create note successfully",
            buttonText: "Okay",
            duration: 5000,
            type: "success"
        });
        this.props.navigation.navigate("NoteList")
    };

    render() {
        const {categories} = this.props;
        return (
            <Container>
                <Content padder keyboardShouldPersistTaps='never' keyboardDismissMode='on-drag'>
                    <Card>
                        <CardItem>
                            <Body>
                            <Text>Add your note</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <NoteForm onSubmit={this.handleSubmit} categories={categories} />
                    <Button full rounded dark
                            style={{ marginTop: 10 }}>
                        <Text>View Notes</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps (state) {

    const {categories} = state.sqliteGetCategory;
    return {
        categories
    }
}

function mapDispatchToProps (dispatch) {
    return {
        createNote: (values) => dispatch(createNote(values)),
        getCategories: () => dispatch(getCategories()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteCreate)