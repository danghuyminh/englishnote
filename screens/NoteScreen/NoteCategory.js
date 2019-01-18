import React from "react";
import {StyleSheet} from "react-native";
import {View} from "native-base";
import { connect } from 'react-redux'
import HeaderGoBack from "../../components/HeaderGoBack";
import {getCategories, selectCategory} from "../../redux/actions/CategoryAction";
import LoadingSpinner from "../../components/LoadingSpinner"
import SelectionList from "../../components/SelectionList";

class NoteCategory extends React.Component {

    async componentWillMount() {
        this.props.getCategories();
    }

    static navigationOptions = ({ navigation }) => ({header: <HeaderGoBack navigation={navigation} title='Select Category' />});

    onItemSelect = (item) => {
        this.props.selectCategory(item.id === 'all' ? undefined : item.id, item.title);
        this.props.navigation.navigate('NoteList');
    };

    render() {
        const {categories, categoryId, isFetching} = this.props;

        return (
            <View style={styles.container}>
                <LoadingSpinner visible={isFetching} title='Loading Categories' />
                <SelectionList selected={categoryId} items={categories} onItemSelect={this.onItemSelect} />
            </View>
        )
    }
}

function mapStateToProps (state) {
    const {isFetching, categories} = state.sqliteGetCategory;
    const {categoryId} = state.sqliteGetNoteCategory;

    let modifedCategories = categories.slice();
    modifedCategories.unshift({id: 'all', title: "All categories"});

    return {
        isFetching, categories: modifedCategories, categoryId
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getCategories: () => dispatch(getCategories()),
        selectCategory: (categoryId, categoryName) => dispatch(selectCategory(categoryId, categoryName))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteCategory)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',

    }
});