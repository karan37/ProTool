import mongoose from 'mongoose';

// Define the Task model
const TodoSchema = new mongoose.Schema({
    text: String,
    estimate: Number,
    createdOn: Date,
    completedOn: Date || null
})

// Export the model
export default TodoSchema;