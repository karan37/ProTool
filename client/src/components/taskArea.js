import React, { useEffect, useState } from 'react';
import { Card, Popconfirm } from 'antd'

import TitleInput from './titleInput'

const TaskItemHeaderBar = ({ title, ...actions }) => {
    const [isEditing, setIsEditing] = useState(title === "")
    useEffect(() => {
        setIsEditing(!title)
    }, [title])

    const onSubmit = taskFields => {
        setIsEditing(!title)
        // actions.upsertTask(taskFields)
    }
    console.log({ title, isEditing })
    return (
        <div className="taskItem__headerBar">
            <Popconfirm
                trigger="hover"
                placement="top"
                okText="Edit Task Title"
                onConfirm={() => setIsEditing(true)}
                icon={""}
            >
                {isEditing ? <TitleInput title={title} placeholder={"Task Title"} onSubmit={onSubmit} /> : <div className="titleHeading">{title}</div>}
                {/* <ProgressIndicator progress={progress} /> */}
            </Popconfirm>
        </div>
    )
}

const TaskItem = ({ task }) => {
    return (
        <Card title={<TaskItemHeaderBar title={task.title} />} className="taskItem">
            Task Body
        </Card>
    )
}

const tasksList = [
    { title: "taskTitle1" },
    {},
    { title: "taskTitle3" },
    { title: "taskTitle4" }
]

export default ({ tasks = tasksList }) => {
    return (
        <div className="cardBody">
            <div className="taskArea">
                {tasks.map((task) => <TaskItem task={task} />)}
            </div>
        </div>
    );
}
