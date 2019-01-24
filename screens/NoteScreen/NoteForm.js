import React, { Component } from 'react';
import {Field, reduxForm} from "redux-form";
import TextField from "../../components/FormFields/TextField";
import SelectField from "../../components/FormFields/SelectField";
import {maxLength128, required} from "../../helpers/Validations";
import {
    Button, Container, Text, Content
} from "native-base";
import {View, TextInput} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import KeyboardShift from "../../components/KeyboardShift";
class NoteForm extends Component {

    render() {

        const { handleSubmit, categories } = this.props;
        return (

                <KeyboardShift>
                    {() => (
                        <View keyboardShouldPersistTaps='never' keyboardDismissMode='on-drag'>
                        <Field
                            name='title'
                            component={TextField}
                            autoFocus={true}
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
                        />
                        </View>
                    )}

                </KeyboardShift>


        )
    }
}

NoteForm = reduxForm({
    form: 'form-note-create',
    enableReinitialize: true
})(NoteForm);

export default NoteForm