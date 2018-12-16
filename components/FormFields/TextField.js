import React from 'react';
import { Input, Item, Icon, Label } from 'native-base';
import FieldWrapper from "./FieldWrapper";

const TextField = (props) => {
    const { input, meta, label, ...inputProps } = props;

    return (
        <FieldWrapper meta={meta}>

            <Label>{label}</Label>
            <Input
                {...inputProps}
                autoFocus={true}
                onChangeText={input.onChange}
                onBlur={input.onBlur}
                onFocus={input.onFocus}
                value={input.value}
            />


        </FieldWrapper>
    );
};

export default TextField;