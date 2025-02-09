import mongoose from "mongoose";
import User from "../models/user.model";
import { bcrypt } from "bcryptjs";
const jwt = require('jsonwebtoken')
// req -> it is body which comes from the user
const jwt_secret = "349805ytrghwu67894tg5uwei9ghwe"
export const singup = async (req, res) => {
    const sesson = await mongoose.startSession();   // start session
    sesson.startTransaction();  // start transaction
    // this will do everything or do nothing if on halfway it will reverse it

    try {
        const {name , email , password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser) {
            const error = new Error('User already exist');
            error.statusCode = 409;
            throw error;
        }

        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create(
            [
                {name , email, password: hashPassword}
            ],
            {sesson}
        )

        const token = jwt.sign({userId : newUser[0]._id}, jwt_secret);


        await sesson.commitTransaction();
        sesson.endSession();

        res.status(201).json({
            success: true,
            message : 'USer successfully created',
            data : {
                token,
                user: newUser[0],
            }
        })
    } catch (error) {
        await sesson.abortTransaction();
        sesson.endSession();
    }
}


export const signin = async (req, res) => {

    

}

export const signout = async (req, res) => {

}