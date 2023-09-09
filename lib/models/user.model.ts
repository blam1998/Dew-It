import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: {
        type: String, 
        required: true
    },
    username: {
        type: String, 
        required: true, 
        unique: true},
    name: {
        type: String, 
        required: true
    },
    dateJoined: {
        type: Date,
        default: Date.now,
        required: true,
    },
    taskCount: {
        type: String,
        required: true
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
    taskStats: {
        allTask:{
            type: String,
        },
        taskDone: {
            type: String,
        },
        taskToday: {
            type: String,
        },
        taskThisWeek:{
            type: String
        }
    }
});

const User =  mongoose.models.User || mongoose.model('User', userSchema);

export default User;
