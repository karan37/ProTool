import React, { useEffect, useState } from 'react';
import { Card, Popconfirm, Button } from 'antd'
import { connect } from 'react-redux'

import { upsertTask, deleteTask } from '../actions'

import TitleInput from './titleInput'
import TodoList from './todoList'

const TaskItemHeaderBar = connect(null, { upsertTask })(({ task = {}, ...actions }) => {
    const { title = "", _id } = task
    const [isEditing, setIsEditing] = useState(title === "")
    useEffect(() => {
        setIsEditing(!title)
    }, [title])

    const onSubmit = taskFields => {
        setIsEditing(!title)
        actions.upsertTask({ _id, ...taskFields })
    }
    return (
        <div className={`taskItem__headerBar ${isEditing ? "taskItem__headerBar--isEditing" : ""}`}>
            <Popconfirm
                placement="top"
                okText="Edit Task Title"
                onConfirm={() => setIsEditing(true)}
                icon={""}
            >
                {isEditing ? <TitleInput title={title} placeholder={"Add Task Title"} onSubmit={onSubmit} /> : <div className="titleHeading">{title}</div>}
                {/* <ProgressIndicator progress={progress} /> */}
            </Popconfirm>
        </div>
    )
})


const DeleteButton = ({ confirmText, onConfirm, disabled }) => (
    <Popconfirm
        className="deleteButton"
        placement="top"
        okText={confirmText}
        onConfirm={onConfirm}
        icon={""}
        disabled={disabled}
    >
        <Button type="primary" shape="circle" icon="delete" disabled={disabled} />
    </Popconfirm>
)

const TaskItem = connect(null, { deleteTask })(({ task = {}, ...actions }) => {
    const id = task._id
    const onClick = e => {
        e.preventDefault()
        actions.deleteTask(id)
    }
    return (
        <Card title={<TaskItemHeaderBar task={task} />} className="taskItem">
            <div className="taskItem__body">
                <div className="taskItem__body__content">
                    <TodoList todos={task.todos} />
                </div>
                <div className="taskItem__body__footer">
                    <DeleteButton confirmText={"Delete this task"} onConfirm={onClick} disabled={!id} />
                </div>
            </div>

        </Card>
    )
})

export default ({ tasks = [] }) => {
    return (
        <div className="cardBody">
            <div className="taskArea">
                {tasks.map((task) => <TaskItem task={task} key={`${task._id}`} />)}
                <TaskItem key={"extra"} />
            </div>
        </div>
    );
}
