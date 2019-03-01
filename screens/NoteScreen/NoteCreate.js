import React from "react";
import {
    Button, Text, Toast
} from "native-base";
import { connect } from 'react-redux'
import {createNote, synchronizeLocalToRemote} from "../../redux/actions/NoteAction"
import NoteForm from "./NoteForm";
import HeaderGoBack from "../../components/HeaderGoBack";
import {getCategories} from "../../redux/actions/CategoryAction";
import {getSetting} from "../../redux/actions/SettingAction";
import {Keyboard, View} from "react-native";
import LoadingSpinner from "../../components/LoadingSpinner";
import KeyboardAccessory from "react-native-sticky-keyboard-accessory";
import {submit} from "redux-form";
import {GlobalStyles} from "../../helpers/Styles";

class NoteCreate extends React.Component {

    state = {
        items: undefined,
        isKeyboardOpened: false,
    };

    static navigationOptions = ({ navigation }) => ({header: <HeaderGoBack navigation={navigation} title='Create Note' />});

    componentWillMount() {
        console.log('NoteScreen Will Mount');
        try {
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

    syncLocalToHost = async () => {
        this.props.synchronizeLocalToRemote();
    };

    handleSubmit = async (values) => {
        await this.props.createNote(values);
        Toast.show({
            text: "Create note successfully",
            buttonText: "Okay",
            duration: 5000,
            type: "success"
        });
        if (!!+await this.props.getSetting('autoSync')) {
            this.syncLocalToHost().then(() => {
                console.log('start synchronizing after create new note');
            });
        }
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
        const {categories, isFetching} = this.props;

        return (
            <View style={GlobalStyles.noteFormContainer}>
                <NoteForm onSubmit={this.handleSubmit} categories={categories} />
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

    const {categories} = state.sqliteGetCategory;
    const {isFetching} = state.AsyncReducer;

    return {
        categories,
        isFetching
    }
}

function mapDispatchToProps (dispatch) {
    return {
        createNote: (values) => dispatch(createNote(values)),
        getCategories: () => dispatch(getCategories()),
        submitForm: () => dispatch(submit('form-note-create')),
        synchronizeLocalToRemote: () => dispatch(synchronizeLocalToRemote()),
        getSetting: (name) => dispatch(getSetting(name)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteCreate)