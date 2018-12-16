import React from "react";
import {
    Container, Text
} from "native-base";
import { connect } from 'react-redux'
import { createCategory, getCategories } from "../../redux/actions/CategoryAction"
import {StyleSheet, View, TouchableHighlight, Modal} from "react-native";
import HeaderDrawer from '../../components/HeaderDrawer'
import CategoryCreatePopup from "./CategoryCreatePopup"

class Category extends React.Component {

    state = {
        modalVisible: false,
    };

    async componentWillMount() {
        console.log('Category List Did Mount')
        console.log(auth.currentUser.uid);
        this.props.getCategories();
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    
    componentWillUnmount() {
        console.log('Category List Unmount')
    }

    deleteNote = (id) => {
        console.log(id)
    };

    render() {

        const {categories, isFetching} = this.props;

        return (
            <Container>
                <HeaderDrawer/>


                <Text>
                 List Content Here
                </Text>
                <CategoryCreatePopup visible={this.state.modalVisible} hide={() => {this.setModalVisible(false)}} />
                <View style={{marginTop: 22}}>


                    <TouchableHighlight
                        onPress={() => {
                            this.setModalVisible(true);
                        }}>
                        <Text>Show Modal</Text>
                    </TouchableHighlight>
                </View>
            </Container>
        );
    }
}

function mapStateToProps (state) {
    const {isFetching, categories} = state.sqliteGetCategory;
    console.log(categories)
    return {
        categories,
        isFetching
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getCategories: () => dispatch(getCategories()),
        createCategory: (title) => dispatch(createCategory(title)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Category)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    indicator: {
        textAlign: 'center',
    },
});