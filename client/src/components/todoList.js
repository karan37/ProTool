import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'

import { Popconfirm } from 'antd'
import TitleInput from './titleInput'
import ProgressIndicator from './ProgressIndicator'

import { upsertGoal } from '../actions'

const sampleTodos = [{ text:"My todo"}]

const Todo = ({ todo = {} }) => {
    return (
        <li className={"todoList__element"}>
            <div className={"todoList__element__text"}>{todo.text}</div>
            <input className={"todoList__element__input"} type={"number"}/>
            <button className={"todoList__elemnt_deleteButton"}>Delete</button>
        </li>
    )
}

// export default connect(null, { upsertGoal })(({ title, progress, ...actions }) => {
export default ({ todos = sampleTodos, ...actions }) => {
    return (
        <ul className={"todoList"}>
            {todos.map(todo => <Todo todo={todo} />)}
            <button className={"todoList__addTodo"}> Add todo</button>
        </ul>
    );
}
