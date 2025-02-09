import mongoose from "mongoose";

const mongooseDBURL = "mongodb+srv://samfip:bKIAxtd3OVqJ2lQt@samfip.gdqd29e.mongodb.net/advanced-backend";

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