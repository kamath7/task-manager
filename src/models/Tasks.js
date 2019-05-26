const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    } ,
    completed:{
        type: Boolean,
        default:false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'//short for reference 

    }
},{
    timestamps:true
});
const Tasks = mongoose.model("tasks",taskSchema);

module.exports = Tasks;