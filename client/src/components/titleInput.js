import React, { useState, useEffect } from 'react'
import { Input } from 'antd'


export default ({ title }) => {
    console.log({title})
    const [value, setValue] = useState(`${title}`)
    console.log({value})
    
    const className = "titleInput"
    const placeHolder = "Please enter your Goal Here"

    const onChange = (e) => {
        e.preventDefault()
        setValue(e.target.value)
    }
    return (
        <Input
            className={className}
            value={value}
            placeholder= {placeHolder}
            onChange={onChange}
        />
    );
}
