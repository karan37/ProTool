import React, { useState, useEffect } from 'react'
import { Input } from 'antd'

export default ({ title = "", placeholder, ...actions }) => {
    const [value, setValue] = useState(`${title}`)

    useEffect(() => {
        setValue(title)
        return () => {
            setValue("")
        }
    }, [title])

    const onChange = e => {
        e.preventDefault()
        setValue(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault()
        if (value) {
            actions.onSubmit({ title: value })
            setValue(title)
        }
    }
    return (
        <Input
            className={"titleInput"}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onPressEnter={onSubmit}
        />
    );
}
