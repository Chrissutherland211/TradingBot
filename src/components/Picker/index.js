import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
 
 const Dropdown = (props) => {
    return (
        <RNPickerSelect
            value={props.value}
            onValueChange={(value) => props.onChange(value)}
            items={props.data}
        />
    );
};

export default Dropdown;