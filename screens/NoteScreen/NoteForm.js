import React, { Component } from 'react';
import {Field, reduxForm} from "redux-form";
import TextField from "../../components/FormFields/TextField";
import SelectField from "../../components/FormFields/SelectField";
import {maxLength128, required} from "../../helpers/Validations";
import {View} from 'react-native';
import KeyboardShift from "../../components/KeyboardShift";

class NoteForm extends Component {
    render() {
        const { categories } = this.props;
        return (
            <KeyboardShift>
                {() => (
                    <View>
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
                            style={{height: 250}}
                            validate={[ required ]}
                        />

                        <Field
                            name={'cat_id'}
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