import mongoose from 'mongoose';

// Define the model
const Schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    // tasks: [
    //     {
    //         task: mongoose.Schema.Types.ObjectId,
    //         ref: 'Task'
    //     }
    // ],
    createdOn: Date,
    completedOn: Date || null
})



// Export the model
export default mongoose.model('Goal', Schema);