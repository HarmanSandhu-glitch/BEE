import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {  // Fixed naming consistency
        type: String,
        required: true,
    },
});

const todoModel = mongoose.model("Todo", todoSchema);
export default todoModel;
