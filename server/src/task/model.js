import mongoose from 'mongoose';

// Define the Task model
const TaskSchema = new mongoose.Schema({
    title: String,
    createdOn: Date,
    completedOn: Date || null
    // doables: [DoableSchema]
})

// Export the model
export default TaskSchema;