import React from 'react';
import {Item, Icon, View, Label} from 'native-base';
import { FormStyles } from '../../helpers/Styles';

const FieldWrapper = (props) => {
    const { meta: {touched, error}, children } = props;

    return (
        <View style={FormStyles.fieldWrapper}>
            { touched ? (
                error ? (
                    <Item error floatingLabel>
                        {children}
                        <Icon name='close-circle' />
                    </Item>
                ) : (
                    <Item success floatingLabel>
                        {children}
                        <Icon name='checkmark-circle' />
                    </Item>
                )
            ) : (
                <Item floatingLabel>{children}</Item>
            )}

        </View>
    );
};

export default FieldWrapper;