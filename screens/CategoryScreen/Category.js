import React from "react";
import {
    Container, List, Icon, Fab, View, Text
} from "native-base";
import { connect } from 'react-redux'
import { createCategory, getCategories, deleteCategory } from "../../redux/actions/CategoryAction"
import {StyleSheet, FlatList} from "react-native";
import HeaderDrawer from '../../components/HeaderDrawer'
import CategoryCreatePopup from "./CategoryCreatePopup"
import CategorySwipeListItem from "./CategorySwipeListItem";
import LoadingSpinner from "../../components/LoadingSpinner";


class Category extends React.Component {

    state = {
        modalVisible: false,
    };

    static navigationOptions = ({ navigation }) => ({
        header: null
    });

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

    onAddButtonClick = () => {
        this.setModalVisible(true);
    };

    onEditButtonClick = (id) => {
        this.props.navigation.navigate('CategoryEdit', {
            categoryId: id
        });
    };

    deleteCategory = (id) => {
        this.props.deleteCategory(id);
    };

    onRefresh = () => {
        this.props.getCategories();
    };

    render() {

        const {categories, isFetching} = this.props;

        return (
            <Container>
                <HeaderDrawer title='Categories' navigation={this.props.navigation}/>
                <LoadingSpinner visible={isFetching} title='Loading Categories' />
                <List style={styles.categoryList}>
                    <FlatList
                        data={categories}
                        renderItem={this._renderCategoryListItem}
                        onRefresh={this.onRefresh}
                        refreshing={isFetching}
                        ListEmptyComponent={() => {
                            return (
                                <View style={styles.emptyContentWrapper}>
                                    <Text>No categories created. Let's create your first category!</Text>
                                </View>
                            )
                        }}
                    />
                </List>
                <CategoryCreatePopup onFormSubmit={this.onFormSubmit} visible={this.state.modalVisible} hide={() => {this.setModalVisible(false)}} />
                <Fab
                    containerStyle={{ }}
                    style={{ backgroundColor: '#34A34F' }}
                    position="bottomRight"
                    onPress={this.onAddButtonClick}>
                    <Icon name="add" />
                </Fab>
            </Container>
        );
    }

    _renderCategoryListItem = (data) => {
        return (
            <CategorySwipeListItem data={data.item} onDeleteCategory={this.deleteCategory} onEditButtonClick={this.onEditButtonClick}/>
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
        deleteCategory: (id) => dispatch(deleteCategory(id)),
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
    emptyContentWrapper: {
        marginLeft: 15,
        marginRight: 15,
        paddingTop: 15
    },
});