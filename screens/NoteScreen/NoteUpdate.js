import React from "react";
import {
    Container, Button, Body, Content, Text, Card, CardItem, Toast
} from "native-base";
import { connect } from 'react-redux'
import { updateNote, getNote } from "../../redux/actions/NoteAction"
import NoteForm from "./NoteForm";
import HeaderGoBack from "../../components/HeaderGoBack";
import {getCategories} from "../../redux/actions/CategoryAction";
import LoadingSpinner from "../../components/LoadingSpinner";

class NoteCreate extends React.Component {

    state = {
        items: undefined
    };

    static navigationOptions = ({ navigation }) => ({header: <HeaderGoBack navigation={navigation} title='Edit Note' />});

    componentWillMount() {
        console.log('NoteScreen Edit Will Mount');
        const {noteId} = this.props.navigation.state.params;
        try {
            this.props.getNote(noteId);
            this.props.getCategories();
        } catch (error) {
            // throw error here
        }
    }

    handleSubmit = async (values) => {
        console.log(values);
        await this.props.updateNote(values.id, values);
        Toast.show({
            text: "Update note successfully",
            buttonText: "Okay",
            duration: 5000,
            type: "success"
        });
        this.props.navigation.navigate("NoteList")
    };

    render() {
        const {categories, isFetching, data} = this.props;
        return (
            <Container>
                <Content padder keyboardShouldPersistTaps='never' keyboardDismissMode='on-drag'>
                    <LoadingSpinner visible={isFetching} title='Update Category' />
                    <Card>
                        <CardItem>
                            <Body>
                            <Text>Edit your note</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <NoteForm onSubmit={this.handleSubmit} categories={categories} initialValues={data} />
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
    const {data} = state.sqliteGetNoteUpdate;
    const {categories} = state.sqliteGetCategory;
    const {isFetching} = state.AsyncReducer;

    return {
        data,
        isFetching,
        categories
    }
}

function mapDispatchToProps (dispatch) {
    return {
        updateNote: (id, values) => dispatch(updateNote(id, values)),
        getNote: (id) => dispatch(getNote(id)),
        getCategories: () => dispatch(getCategories()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteCreate)