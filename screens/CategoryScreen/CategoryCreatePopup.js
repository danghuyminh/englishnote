import React from "react";
import {Modal, Alert, View, StyleSheet} from "react-native";
import {
    Text, Button
} from "native-base";
import { connect } from 'react-redux'
import CategoryForm from "./CategoryForm";
import Message from "../../components/Message";

class CategoryCreatePopup extends React.Component {

    render() {
        const {visible, hide, onFormSubmit} = this.props;

        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={visible}
                presentationStyle="overFullScreen"
                onRequestClose={() => {
                    hide()
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
                    <Message/>
                    <View style={{height: 120, marginLeft: 20, marginRight: 20, marginTop: -50}}>
                        <CategoryForm onSubmit={onFormSubmit}/>
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