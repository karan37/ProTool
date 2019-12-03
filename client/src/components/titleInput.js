import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Input } from 'antd'

import { upsertGoal } from '../actions'

export const TitleInput = ({ title, ...actions }) => {
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
        actions.upsertGoal({title:value})
    }
    return (
        <Input
            className={"titleInput"}
            value={value}
            placeholder={"Please enter your Goal Here"}
            onChange={onChange}
            onPressEnter={onSubmit}
        />
    );
}

export default connect(null, { upsertGoal })(TitleInput)
