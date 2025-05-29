import { Router } from "express";

import { Signin, Signout, Singup } from "../controllers/auth.controllers.js";


const authrouter = Router();

authrouter.post("/sign-up", Singup)

authrouter.post("/sign-ip", Signin)

authrouter.post("/sign-out",Signout)

export default authrouter;