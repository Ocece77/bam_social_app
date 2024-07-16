import express from "express";
import { login, sign } from "../controllers/user.controller.js";

const userRoutes = express.Router()

userRoutes.post("/login", login)
userRoutes.post("/sign" , sign)

export default userRoutes;