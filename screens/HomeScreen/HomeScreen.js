import React from "react";
import {
    Container, Button, Body, Content, Text, Card, CardItem
} from "native-base";
import { connect } from 'react-redux'
import { createNote } from "../../redux/actions/NoteAction"
import AddNoteForm from "./AddNoteForm";
import HeaderDrawer from "../../components/HeaderDrawer";
import HeaderGoBack from "../../components/HeaderGoBack";
import {getCategories} from "../../redux/actions/CategoryAction";

class HomeScreen extends React.Component {

    state = {
        items: undefined
    };

    static navigationOptions = ({ navigation }) => ({header: <HeaderGoBack navigation={navigation} title='Create Note' />});

    componentWillMount() {
        try {
            this.props.getCategories();
        } catch (error) {
            // throw error here
        }
    }

    handleSubmit = async (values) => {
        console.log(values)
        await this.props.createNote(values);
        //const notes = await Sqlite.selectNotes();
        this.props.navigation.navigate("Notes")
    };

    render() {
        const {categories} = this.props;
        console.log('categories');
        console.log(categories);
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
                    <AddNoteForm onSubmit={this.handleSubmit} categories={categories} />
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
)(HomeScreen)