import React, { Component } from 'react';
import {Field, reduxForm} from "redux-form";
import TextField from "../../components/FormFields/TextField";
import SelectField from "../../components/FormFields/SelectField";
import {maxLength128, required} from "../../helpers/Validations";
import {
    Button, Container, Text
} from "native-base";

class AddNoteForm extends Component {

    render() {
        const categories = [
            {id: 1, name: 'Wallet'},
            {id: 2, name: 'ATM Card'},
            {id: 3, name: 'Debit Card'},
            {id: 4, name: 'Credit Card'},
            {id: 5, name: 'Net Banking'},
        ];

        const languages = [
            {id: 1, name: 'English'},
            {id: 2, name: 'Vietnamese'},
        ];

        const { handleSubmit, isFetching } = this.props;
        return (
            <Container>
                <Field
                    name='title'
                    component={TextField}
                    label="Note title"
                    validate={[ required, maxLength128 ]}
                />
                <Field
                    name='explanation'
                    component={TextField}
                    multiline={true}
                    numberOfLines={6}
                    label="Note explanation"
                    validate={[ required ]}
                />
                <Field
                    name={'category'}
                    component={SelectField}
                    items={categories}
                    uniqueKey="cat_"
                    label="Category"
                    validate={[ required ]}
                />
                <Button full rounded success
                        style={{ marginTop: 10 }}
                        onPress={handleSubmit}>
                    <Text>Save</Text>
                </Button>
            </Container>
        )
    }
}

AddNoteForm = reduxForm({
    form: 'form-note-create',
    enableReinitialize: true
})(AddNoteForm);

export default AddNoteForm