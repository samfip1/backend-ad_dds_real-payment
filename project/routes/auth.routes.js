import { Router } from "express";
import { signin, signout, singup } from "../controllers/auth.controllers";

const authrouter = Router();

authrouter.post("/sign-up", singup)

authrouter.post("/sign-ip", signin)

authrouter.post("/sign-out", signout)

export default authrouter;