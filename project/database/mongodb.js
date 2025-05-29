import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();


const mongooseDBURL = process.env.mongooseDBURL ;


const connectDB = async () => {
    try {
        await mongoose.connect(mongooseDBURL)

        console.log("Connected to the database " + mongooseDBURL);
    } catch (error) {
        console.log("Error connecting to the database", error);

        process.exit(1);
        
    }
}

export default connectDB;