import React, { Component } from 'react';
import {Field, reduxForm} from "redux-form";
import TextField from "../../components/FormFields/TextField";
import {maxLength128, required} from "../../helpers/Validations";
import {
    Button, Container, Text
} from "native-base";

class CategoryForm extends Component {

    render() {

        const { handleSubmit } = this.props;
        return (
            <Container>
                <Field
                    name='title'
                    component={TextField}
                    label="Category title"
                    validate={[ required, maxLength128 ]}
                />
                <Button full rounded success
                        style={{ marginTop: 10 }}
                        onPress={handleSubmit}>
                    <Text>Add</Text>
                </Button>
            </Container>
        )
    }
}

CategoryForm = reduxForm({
    form: 'form-category-create',
    enableReinitialize: true
})(CategoryForm);

export default CategoryForm