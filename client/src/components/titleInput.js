import React, { useState, useEffect } from 'react'
import { Input } from 'antd'

export default ({ title, placeholder, ...actions }) => {
    const [value, setValue] = useState(`${title}`)

    useEffect(() => {
        setValue(title)
    }, [title])

    const onChange = e => {
        e.preventDefault()
        setValue(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault()
        actions.onSubmit({ title: value })
    }
    return (
        <Input
            className={"titleHeading titleHeading--isEditing"}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onPressEnter={onSubmit}
            onBlur={onSubmit}
        />
    );
}
