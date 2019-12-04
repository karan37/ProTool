import mongoose from 'mongoose';

import TaskSchema from '../task/model'

// Define the Goal model
const GoalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    tasks: [TaskSchema],
    createdOn: Date,
    completedOn: Date || null
})

// Export the model
export default mongoose.model('Goal', GoalSchema);