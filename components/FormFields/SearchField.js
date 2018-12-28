import React from 'react';
import { Input } from 'native-base';

const SearchField = (props) => {
    const { input, ...inputProps } = props;

    return (
        <Input
            {...inputProps}
            autoFocus={false}
            onChangeText={input.onChange}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            value={input.value}
        />
    );
};

export default SearchField;