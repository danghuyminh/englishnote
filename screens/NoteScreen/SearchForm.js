import React, { Component } from 'react';
import {Field, reduxForm} from "redux-form";
import SearchField from "../../components/FormFields/SearchField";
import {maxLength128} from "../../helpers/Validations";
import {
    Content, Header, Icon, Item, Input
} from "native-base";
import {StyleSheet} from "react-native";

class SearchForm extends Component {

    handleBlur = (value) => {
        console.log('onBlur values')
        console.log(value)
        if (!value || value === '') {
            this.props.handleSubmit()
        }
       return true;
    };

    render() {
        const { handleSubmit } = this.props;
        return (
            <Header style={styles.searchContainer}>
               <Content>
                   <Item rounded>
                       <Icon active name='search' />
                       <Field
                           name='keyword'
                           component={SearchField}
                           placeholder="Search for..."
                           onSubmitEditing={handleSubmit}
                           handleBlur={this.handleBlur}
                           validate={[ maxLength128 ]}
                       />
                   </Item>
               </Content>
            </Header>
        )
    }
}

SearchForm = reduxForm({
    form: 'form-note-search',
    enableReinitialize: true
})(SearchForm);

export default SearchForm

const styles = StyleSheet.create({
    searchContainer: {
        paddingTop: 3,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
});