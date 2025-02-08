import { Router } from "express";

const authrouter = Router();

authrouter.post("/sign-up", (req, res) => {
    res.send("Sign up");

    res.json({
        title: "Sign up"
    });
});

authrouter.post("/sign-ip", (req, res) => {
    res.send("Sign in");

    res.json({
        title: "Sign in"
    });
});

authrouter.post("/sign-out", (req, res) => {
    res.send("Sign out");

    res.json({
        title: "Sign out"
    });
});

export default authrouter;