import React from 'react';
import {View, TextInput} from 'react-native';
import {Icon, Input, Label} from 'native-base';
import FieldWrapper from "./FieldWrapper";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const TextField = (props) => {
    const { input, meta, label, autoFocus, ...inputProps } = props;
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