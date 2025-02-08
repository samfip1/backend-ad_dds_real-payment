import { Router } from "express";


const userrouter = Router();


userrouter.get("/users", (req, res) => {
    res.send("GET all users");

    res.json({
        title: "Profile"
    });
});

userrouter.get("/:id", (req, res) => {
    res.send("GET user by id");

    res.json({
        title: "Profile"
    });
});

userrouter.post("/", (req, res) => {
    res.send("POST create users");

    res.json({
        title: "Profile"
    });
});

userrouter.put("/:id", (req, res) => {
    res.send("PUT update user");

    res.json({
        title: "Profile"
    });
});

userrouter.delete("/:id", (req, res) => {
    res.send("DELETE user");

    res.json({
        title: "Profile"
    });
});

export default userrouter;