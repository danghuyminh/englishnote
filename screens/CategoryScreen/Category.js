import React from "react";
import {
    Container, Text, List, ListItem, Icon, Left, Right
} from "native-base";
import { connect } from 'react-redux'
import { createCategory, getCategories } from "../../redux/actions/CategoryAction"
import {StyleSheet, View, TouchableHighlight, FlatList} from "react-native";
import HeaderDrawer from '../../components/HeaderDrawer'
import CategoryCreatePopup from "./CategoryCreatePopup"
import CategorySwipeListItem from "./CategorySwipeListItem";

class Category extends React.Component {

    state = {
        modalVisible: false,
    };

    async componentWillMount() {
        console.log('Category List Did Mount')
        this.props.getCategories();
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    
    componentWillUnmount() {
        console.log('Category List Unmount')
    }

    onFormSubmit = async (values) => {
        console.log(values);
        try {
            await this.props.createCategory(values.title);
            this.setModalVisible(false)
        } catch (error) {
            // Create category error
        }
    };

    deleteNote = (id) => {
        console.log(id)
    };

    render() {

        const {categories, isFetching} = this.props;
        console.log('categories');
        console.log(categories);

        return (
            <Container>
                <HeaderDrawer/>
                <List style={styles.categoryList}>
                    <FlatList
                        data={categories}
                        renderItem={this._renderCategoryListItem}
                    />
                </List>
                <CategoryCreatePopup onFormSubmit={this.onFormSubmit} visible={this.state.modalVisible} hide={() => {this.setModalVisible(false)}} />
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

    _renderCategoryListItem = (data) => {
        console.log('categoryItem');
        return (
            <CategorySwipeListItem data={data.item}/>
        )
    }
}

function mapStateToProps (state) {
    const {isFetching, categories} = state.sqliteGetCategory;

    let modifiedCategories = categories.map((category) => {
        category.key = category.id.toString();
        return category;
    });
    return {
        categories: modifiedCategories,
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
    categoryList: {

    }
});