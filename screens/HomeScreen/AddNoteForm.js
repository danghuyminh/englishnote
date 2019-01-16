import React, { Component } from 'react';
import {Field, reduxForm} from "redux-form";
import TextField from "../../components/FormFields/TextField";
import SelectField from "../../components/FormFields/SelectField";
import {maxLength128, required} from "../../helpers/Validations";
import {
    Button, Container, Text, Content
} from "native-base";

class AddNoteForm extends Component {

    render() {

        const { handleSubmit, categories } = this.props;
        return (
            <Container>
                <Content keyboardShouldPersistTaps='never' keyboardDismissMode='on-drag'>
                <Field
                    name='title'
                    component={TextField}
                    autoFocus={true}
                    label="Note title"
                    validate={[ required, maxLength128 ]}
                    keyboardShouldPersistTaps='handled' keyboardDismissMode='on-drag'
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
                />
                <Button full rounded success
                        style={{ marginTop: 10 }}
                        onPress={handleSubmit}>
                    <Text>Save</Text>
                </Button>
                </Content>
            </Container>
        )
    }
}

AddNoteForm = reduxForm({
    form: 'form-note-create',
    enableReinitialize: true
})(AddNoteForm);

export default AddNoteForm