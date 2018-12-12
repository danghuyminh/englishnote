import React from "react";
import {Modal, TouchableHighlight, Alert, View, StyleSheet} from "react-native";
import {
    Container, Text, Content, Button, Footer
} from "native-base";
import { connect } from 'react-redux'
import CategoryForm from "./CategoryForm";

class CategoryCreatePopup extends React.Component {

    onFormSubmit = (values) => {
        console.log(values);
    };

    render() {
        const {visible, hide} = this.props;
        console.log('render')
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={visible}
                presentationStyle="overFullScreen"
                onRequestClose={() => {
                    Alert.alert('Modal closed', 'Modal has been closed.');
                }}
            >

                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'stretch',
                }}>
                    <View style={{height: 50, marginLeft: 20, marginRight: 20, paddingTop: 10, borderBottomColor: '#47315a', borderBottomWidth: 1,}}>
                        <Text>Add new category</Text>
                    </View>
                    <View style={{height: 120, marginLeft: 20, marginRight: 20, marginTop: -50, backgroundColor: 'skyblue'}}>
                        <CategoryForm onSubmit={this.onFormSubmit}/>
                    </View>
                    <View style={{height: 50, marginLeft: 20, marginRight: 20}}>
                        <Button full rounded danger onPress={hide}>
                            <Text>Close</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        )
    }
}

function mapStateToProps (state) {
    //const {isFetching, categories} = state.sqliteGetCategory;

    return {

    }
}

function mapDispatchToProps (dispatch) {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryCreatePopup)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});