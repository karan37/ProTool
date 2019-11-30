import React, { Fragment } from 'react';
import GoalBar from './goalBar'
import TaskArea from './taskArea'

export default ({ title, progress, tasks }) => {
    return (
        <div className="toolContainer">
            <GoalBar title={title} progress={progress} />
            <TaskArea tasks={tasks} />
        </div>
    );
}
