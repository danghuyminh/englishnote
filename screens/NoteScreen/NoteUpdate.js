import React from "react";
import {
    Container, Button, Body, Content, Text, Card, CardItem, Toast, Icon
} from "native-base";
import {View, Keyboard, ScrollView} from 'react-native';
import { connect } from 'react-redux'
import { updateNote, getNote } from "../../redux/actions/NoteAction"
import NoteForm from "./NoteForm";
import HeaderGoBack from "../../components/HeaderGoBack";
import {getCategories} from "../../redux/actions/CategoryAction";
import LoadingSpinner from "../../components/LoadingSpinner";
import KeyboardAccessory from 'react-native-sticky-keyboard-accessory';

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
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
            }} >
                    <LoadingSpinner visible={isFetching} title='Update Category' />
                <ScrollView>
                    <NoteForm onSubmit={this.handleSubmit} categories={categories} initialValues={data} />
                </ScrollView>
                    <KeyboardAccessory>
                        <View style={{ flexDirection: 'row', height: 46, width: '100%',   justifyContent: 'space-between', }}>
                            <Button danger
                                    onPress={this.handleSubmit}
                                    style={{width: '50%', justifyContent: 'center',
                                        alignItems: 'center'}}
                            >
                                <Text>Ignore</Text>
                            </Button>
                            <Button success
                                    onPress={() => Keyboard.dismiss()}
                                    style={{width: '50%', justifyContent: 'center',
                                        alignItems: 'center'}}
                            >
                                <Text>Save</Text>
                            </Button>
                        </View>
                    </KeyboardAccessory>
            </View>
        );
    }
}

function mapStateToProps (state) {
    const {data} = state.sqliteGetSingleNote;
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