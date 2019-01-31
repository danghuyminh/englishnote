import React from "react";
import {
    Button, Text, Toast
} from "native-base";
import {View, Keyboard, ScrollView} from 'react-native';
import { connect } from 'react-redux'
import { updateNote, getNote } from "../../redux/actions/NoteAction"
import NoteForm from "./NoteForm";
import HeaderGoBack from "../../components/HeaderGoBack";
import {getCategories} from "../../redux/actions/CategoryAction";
import LoadingSpinner from "../../components/LoadingSpinner";
import KeyboardAccessory from 'react-native-sticky-keyboard-accessory';
import {submit} from 'redux-form';
import {GlobalStyles} from "../../helpers/Styles";

class NoteUpdate extends React.Component {

    state = {
        items: undefined,
        isKeyboardOpened: false,
    };

    static navigationOptions = ({ navigation }) => ({header: <HeaderGoBack navigation={navigation} title='Edit Note' />});

    componentWillMount() {
        const {noteId} = this.props.navigation.state.params;
        try {
            this.props.getNote(noteId);
            this.props.getCategories();
        } catch (error) {
            // throw error here
        }
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = () => {
        this.setState({
            isKeyboardOpened: true
        })
    };

    _keyboardDidHide = () => {
        this.setState({
            isKeyboardOpened: false
        })
    };

    handleSubmit = async (values) => {
        await this.props.updateNote(values.id, values);
        Toast.show({
            text: "Update note successfully",
            buttonText: "Okay",
            duration: 5000,
            type: "success"
        });
        this.props.navigation.navigate("NoteList")
    };

    onIgnoreClick = () => {
        if (this.state.isKeyboardOpened) {
            Keyboard.dismiss()
        } else {
            this.props.navigation.navigate("NoteList")
        }
    };

    render() {
        const {categories, isFetching, data} = this.props;
        return (
            <View style={GlobalStyles.noteFormContainer} >
                <LoadingSpinner visible={isFetching} title='Update Category' />
                <ScrollView>
                    <NoteForm onSubmit={this.handleSubmit} categories={categories} initialValues={data} />
                </ScrollView>
                <KeyboardAccessory>
                    <View style={GlobalStyles.stickyButtonWrapper}>
                        {this.state.isKeyboardOpened ? (
                            <Button info onPress={this.onIgnoreClick} style={GlobalStyles.stickyButton}>
                                <Text>Done</Text>
                            </Button>
                        ): (
                            <Button danger onPress={this.onIgnoreClick} style={GlobalStyles.stickyButton}>
                                <Text>Ignore</Text>
                            </Button>
                        )}
                        <Button success onPress={this.props.submitForm} style={GlobalStyles.stickyButton}>
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
        submitForm: () => dispatch(submit('form-note-create')),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteUpdate)