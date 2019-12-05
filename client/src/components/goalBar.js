import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'

import { Popconfirm } from 'antd'
import TitleInput from './titleInput'
import ProgressIndicator from './ProgressIndicator'

import { upsertGoal } from '../actions'



export default connect(null, { upsertGoal })(({ title, progress, ...actions }) => {
    const [isEditing, setIsEditing] = useState(title === "")
    useEffect(() => {
        setIsEditing(title === "")
    }, [title])

    const onSubmit = goalFields => {
        setIsEditing(!title)
        actions.upsertGoal(goalFields)
    }

    return (
        <div className={`goal__headerBar ${isEditing ? "goal__headerBar--isEditing" : ""}`}>
            <Popconfirm
                placement="bottom"
                okText="Edit Goal Title"
                onConfirm={() => setIsEditing(true)}
                disabled={isEditing}
                icon={""}
            >
                <TitleInput title={title} placeholder={"Goal Title"} onSubmit={onSubmit} />
                {isEditing ? null : <div className="titleHeading">{title}</div>}
                {/* <ProgressIndicator progress={progress} /> */}
            </Popconfirm>
        </div>
    );
})
