import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Popconfirm } from 'antd'

import { upsertTodo, deleteTodo } from '../actions'

const Todo = connect(null, { upsertTodo, deleteTodo }) (({ todo = {}, taskId = "", isExtra, upsertTodo, deleteTodo }) => {
    const [isEditing, setIsEditing] = useState(false)
    const toggleIsEditing = () => {
        setIsEditing(!isEditing)
    }
    const onDeleteTodoConfirm = () => {
        const { _id } = todo
        deleteTodo(_id, taskId)
    }
    return (
        !isEditing && !isExtra
        ?
            <li className={"todoList__element"}>
                <div className={"todoList__element__text"}>{todo.text}</div>
                <div>--</div>
                <div className={"todoList__element__input"}>{todo.estimate}</div>
                <div>--</div>
                <button className={"todoList__elemnt_editButton"} onClick={toggleIsEditing}>Edit</button>
                <Popconfirm
                    placement="top"
                    okText="Delete This Todo?"
                    onConfirm={onDeleteTodoConfirm}
                    icon={""}
                >
                    <button className={"todoList__elemnt_deleteButton"}>Delete</button>
                </Popconfirm>
                
            </li>
        :   <TodoForm todo={todo} taskId={taskId} upsertTodo={upsertTodo} isExtra={isExtra} toggleIsEditing={toggleIsEditing} />
    )
})

const TodoForm =  ({ todo = {}, taskId = "", isExtra, upsertTodo, toggleIsEditing }) => {
    const [textValue, setTextValue] = useState(todo.text || "")
    const [estimateValue, setEstimateValue] = useState(todo.estimate || 0)

    // Bind input value to local state
    const onTextChange = e => {
        e.preventDefault()
        setTextValue(e.target.value)
    }

    // Bind input value to local state
    const onEstimateChange = e => {
        e.preventDefault()
        setEstimateValue(e.target.value)
    }

    const onUpsertTodo = (e) => {
        e.preventDefault()
        console.log({textValue, estimateValue})
        upsertTodo({taskId, ...todo, text: textValue, estimate: estimateValue})
        toggleIsEditing()
    }

    return (
        <li className={"todoList__form"}>
            <input className={"todoList__form__text"} value = {textValue} onChange={onTextChange}/>
            <input className={"todoList__form__input"} value = {estimateValue} onChange={onEstimateChange} type={"number"}/>
            <button className={"todoList__form__button"} onClick={onUpsertTodo}> { isExtra ? "Add todo" : "Update Todo" }</button>
        </li>
    )
}

// export default connect(null, { upsertGoal })(({ title, progress, ...actions }) => {
export default ({ todos = [],  taskId="", ...actions }) => {
    return (
        <ul className={"todoList"}>
            {todos.map(todo => <Todo todo={todo} taskId={taskId} key={todo._id}/>)}
            <Todo taskId={taskId} isExtra={true}/>
        </ul>
    );
}