import React from 'react';
import { Input } from 'native-base';

const SearchField = (props) => {
    const { input, handleBlur, ...inputProps } = props;

    return (
        <Input
            {...inputProps}
            autoFocus={false}
            onChangeText={input.onChange}
            onBlur={(value) => {handleBlur(input.value);input.onBlur(value);}}
            onFocus={input.onFocus}
            value={input.value}
        />
    );
};

export default SearchField;