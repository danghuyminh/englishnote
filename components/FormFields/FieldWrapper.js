import React from 'react';
import {Item, View} from 'native-base';
import { FormStyles } from '../../helpers/Styles';

const FieldWrapper = (props) => {
    const { meta: {touched, error}, children } = props;

    return (
        <View style={FormStyles.fieldWrapper}>
            { touched ? (
                error ? (
                    <Item error floatingLabel>
                        {children}
                    </Item>
                ) : (
                    <Item success floatingLabel>
                        {children}
                    </Item>
                )
            ) : (
                <Item floatingLabel>{children}</Item>
            )}

        </View>
    );
};

export default FieldWrapper;