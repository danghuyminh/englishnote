import React from "react";
import {
    Container, Text
} from "native-base";
import { connect } from 'react-redux'
import { createCategory, getCategories } from "../../redux/actions/CategoryAction"
import {StyleSheet} from "react-native";
import HeaderDrawer from '../../components/HeaderDrawer'

class Category extends React.Component {

    async componentWillMount() {
        console.log('Category List Did Mount')
        //this.props.fetchNotes({isFirstLoading: true});
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

                <Container style={styles.container}>
                <Text>
                 List Content Here
                </Text>
                </Container>
            </Container>
        );
    }
}

function mapStateToProps (state) {
    //const {isFetching, categories} = state.sqliteGetCategory;

    return {

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