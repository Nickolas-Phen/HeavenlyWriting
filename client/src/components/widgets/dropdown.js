import React, { Component } from 'react'
import Select from 'react-select'

const DropDown = () => {
    const options = [
        {value: 'chocolate', label: 'Chocolate'},
        {value: 'strawberry', label: 'Strawberry'},
        {value: 'vanilla', label: 'Vanilla'}
    ]

    const MyComponent = () => {
        return <Select options={options}/>
    }
    return <div>{MyComponent}</div>
}

export default DropDown;
