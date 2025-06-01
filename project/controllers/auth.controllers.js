import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

// req -> it is body which comes from the user
const jwt_secret = process.env.jwt_secret;
console.log(jwt_secret);
export const Singup = async (req, res) => {
    const session = await mongoose.startSession(); // ✅ Correct name
    session.startTransaction();

    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create(
            [{ name, email, password: hashPassword }],
            { session } // ✅ Fix here
        );

        const token = jwt.sign({ userId: newUser[0]._id }, jwt_secret);

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: "User successfully created",
            data: {
                token,
                user: newUser[0],
            },
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};

export const Signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.find({email});

        if (!user || user.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user[0].password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }
        const token = jwt.sign({ userId: user[0]._id }, jwt_secret);

        res.status(200).json({
            success: true,
            message: "User successfully signed in",
            data: {
                token,
                user: user[0],
            },
        });


    } catch (error) {
        
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Something went wrong",
        });

    }
};

export const Signout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({
            success: true,
            message: "User successfully signed out",
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};
