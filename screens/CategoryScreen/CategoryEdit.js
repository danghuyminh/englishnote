import React from "react";
import {StyleSheet} from "react-native";
import { View } from "native-base";
import { connect } from 'react-redux'
import CategoryForm from "./CategoryForm";
import HeaderGoBack from "../../components/HeaderGoBack";
import {getCategory, updateCategory} from "../../redux/actions/CategoryAction";
import Message from "../../components/Message";
import LoadingSpinner from "../../components/LoadingSpinner"

class CategoryEdit extends React.Component {

    async componentWillMount() {
        const {categoryId} = this.props.navigation.state.params;
        try {
            await this.props.getCategory(categoryId);
        } catch (error) {
            // This may throw an error
        }
    }

    onFormSubmit = async (values) => {
        try {
            await this.props.updateCategory(values);
            this.props.navigation.navigate('Category');
        } catch (error) {
            // Create category error
        }
    };

    static navigationOptions = ({ navigation }) => ({header: <HeaderGoBack navigation={navigation} title='Edit Category' />});

    render() {
        const {data, isFetching} = this.props;

        return (
            <View style={styles.container}>
                <Message/>
                <LoadingSpinner visible={isFetching} title='Creating Category' />
                <CategoryForm initialValues={data} update={true} onSubmit={this.onFormSubmit}/>
            </View>
        )
    }
}

function mapStateToProps (state) {
    const {isFetching, data} = state.sqliteGetCategory;

    return {
        isFetching,
        data
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getCategory:    (categoryId) => dispatch(getCategory(categoryId)),
        updateCategory: (values)     => dispatch(updateCategory(values))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryEdit)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        paddingLeft: 15,
        paddingRight: 15
    }
});