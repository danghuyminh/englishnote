import React, { Component } from 'react';
import {Field, reduxForm} from "redux-form";
import TextField from "../../components/FormFields/TextField";
import {maxLength128, required} from "../../helpers/Validations";
import {
    Button, View, Text
} from "native-base";

class CategoryForm extends Component {

    render() {

        const { handleSubmit, update, autoFocus } = this.props;
        return (
            <View>
                <Field
                    name='title'
                    component={TextField}
                    autoFocus={true}
                    label="Category title"
                    validate={[ required, maxLength128 ]}
                />
                <Button full rounded success
                        style={{ marginTop: update ? 60 : 20 }}
                        onPress={handleSubmit}>
                    <Text>{update ? 'Update Category' : 'Create Category'}</Text>
                </Button>
            </View>
        )
    }
}

CategoryForm = reduxForm({
    form: 'form-category-create',
    enableReinitialize: true
})(CategoryForm);

export default CategoryForm