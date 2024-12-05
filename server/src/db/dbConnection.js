import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        mongoose.connect('mongodb://localhost:27017/vip-security');
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error while connection the database: ",error);
    }
}

export default dbConnect;