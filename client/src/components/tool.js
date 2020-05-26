import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';

import GoalBar from './goalBar'
import TaskArea from './taskArea'

import { getGoal } from '../actions'

const mapStateToProps = ({ goal, todos }) => {
    const { tasks = [] } = goal
    return {
        goal: {
            ...goal,
            tasks: tasks.map(task => {
                return {
                    ...task,
                    todos: todos.allIds.map(todoId => todos.byId[todoId]).filter(todo => todo.taskId === task._id)
                }
            })
        }
    }
}

export default connect(
    mapStateToProps,
    { getGoal }
)(
    ({ goal, ...actions }) => {
        useEffect(() => {
            actions.getGoal()
        }, [])
        const { tasks } = goal
        return (
            <Card
                className="toolContainer"
                title={<GoalBar title={goal.title} progress={goal._id} />}
            >
                <TaskArea tasks={tasks} />
            </Card>
        );
    })
