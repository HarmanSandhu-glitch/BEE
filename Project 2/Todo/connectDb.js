import mongoose from "mongoose";

const dbLink = "mongodb+srv://harman:qwertyuiop@cluster0.w7nuw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

async function connectDb() {
    try {
        await mongoose.connect(dbLink);
        console.log("Connected to database");
    } catch (error) {
        console.log("Error connecting to database");
        console.log(error.message);
    }
}

export default connectDb;