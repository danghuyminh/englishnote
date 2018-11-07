import React from 'react';
import {Item, Picker, Icon, View, Label} from 'native-base';
import { FormStyles } from '../../helpers/Styles';

const SelectField = (props) => {
    const { input, items, meta, uniqueKey, label, ...inputProps } = props;

    return (
        <SelectFieldWrapper meta={meta} label={label}>
            <Picker
                {...inputProps}
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{ width: undefined }}
                placeholder="Select your SIMs"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                onValueChange={input.onChange}
                selectedValue={input.value}
                onBlur={input.onBlur}
                onFocus={input.onFocus}
            >
                <Picker.Item label="Select from the list" value="" key={uniqueKey + '0'} />
                { items.map(
                    (item) => {
                        return <Picker.Item label={item.name} value={item.id} key={uniqueKey + item.id} />
                    })
                }
            </Picker>
        </SelectFieldWrapper>
    );
};

export default SelectField;

const SelectFieldWrapper = (props) => {
    const { meta: {touched, error}, label, children } = props;

    return (
        <View style={FormStyles.fieldWrapper}>
            {label && <Label>{label}</Label>}
            { touched ? (
                error ? (
                    <Item error picker>
                        {children}
                        <Icon name='close-circle' />
                    </Item>
                ) : (
                    <Item success picker >
                        {children}
                        <Icon name='checkmark-circle' />
                    </Item>
                )
            ) : (
                <Item picker>{children}</Item>
            )}

        </View>
    );
};