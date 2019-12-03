import React, { useState, useEffect } from 'react'
import { Input } from 'antd'

export default ({ title, ...actions }) => {
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
            className={"titleInput"}
            value={value}
            placeholder={"Please enter your Goal Here"}
            onChange={onChange}
            onPressEnter={onSubmit}
            onBlur={onSubmit}
        />
    );
}
