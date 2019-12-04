import mongoose from 'mongoose';

import TodoSchema from '../todo/model'

// Define the Task model
const TaskSchema = new mongoose.Schema({
    title: String,
    createdOn: Date,
    completedOn: Date || null,
    todos: [TodoSchema]
})

// Export the model
export default TaskSchema;