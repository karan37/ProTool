import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { DownOutlined, UnorderedListOutlined } from '@ant-design/icons'

import { Popconfirm, Dropdown, Menu } from 'antd'
import TitleInput from './titleInput'

import { upsertGoal, getUserGoals, getGoal, clearGoal } from '../actions'


const mapStateToProps = ({ goals }) => {
    return {
        goals
    }
}
const MoreGoalsDropDown = connect(mapStateToProps, { getUserGoals, getGoal, clearGoal })(({ goals, getUserGoals, getGoal, clearGoal }) => {
    const onDropDownClick = e => {
        e.preventDefault()
        getUserGoals()
    }
    const onGoalClick = goalId => e => {
        e.preventDefault()
        getGoal(goalId)
    }
    const onCreateClick = e => {
        e.preventDefault()
        clearGoal()
    }
    const goalList = goals.map((goal, i) => <Menu.Item key={i}><a href="#" onClick={onGoalClick(goal._id)}>{goal.title}</a></Menu.Item>)
    const menu = (
        <Menu>
            {goalList}
            <Menu.Divider />
            <Menu.Item key={goalList.length}><a href="#" onClick={onCreateClick}>Create New</a></Menu.Item>
        </Menu>
    );
    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={onDropDownClick}>
                More Goals <DownOutlined />
            </a>
        </Dropdown>
    )
})

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
            <MoreGoalsDropDown />
            <Popconfirm
                placement="bottom"
                okText="Edit Goal Title"
                onConfirm={() => setIsEditing(true)}
                disabled={isEditing}
                icon={""}
            >

                {isEditing ? <TitleInput title={title} placeholder={"Goal Title"} onSubmit={onSubmit} /> : <div className="titleHeading">{title}</div>}
                {/* <ProgressIndicator progress={progress} /> */}
            </Popconfirm>
            <div className="goal__moreOptions"><UnorderedListOutlined /></div>
        </div>
    );
})
