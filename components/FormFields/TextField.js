import React from 'react';
import {Icon, Input, Label} from 'native-base';
import FieldWrapper from "./FieldWrapper";
const TextField = (props) => {
    const { input, meta, label, autoFocus, style, ...inputProps } = props;
    const {error, touched} = meta;

    return (
        <FieldWrapper meta={meta}>
            <Label>{label}</Label>
            <Input
                {...inputProps}
                autoFocus={autoFocus}
                onChangeText={input.onChange}
                onBlur={input.onBlur}
                onFocus={input.onFocus}
                value={input.value}
                style={style}
            />
            {touched &&
            (error ? (
                    <Icon name='close-circle'/>
                ) : (
                    <Icon name='checkmark-circle'/>
                ))
            }


        </FieldWrapper>
    );
};

export default TextField;