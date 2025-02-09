import mongoose from "mongoose";
import User from "../models/user.model";

// req -> it is body which comes from the user

export const singup = async (req, res) => {
    const sesson = await mongoose.startSession();   // start session
    sesson.startTransaction();  // start transaction
    // this will do everything or do nothing if on halfway it will reverse it

    try {
        const {name , email , password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser) {

        }

        await sesson.commitTransaction();
    } catch (error) {
        await sesson.abortTransaction();
        sesson.endSession();
    }
}


export const signin = async (req, res) => {

    
}

export const signout = async (req, res) => {

}