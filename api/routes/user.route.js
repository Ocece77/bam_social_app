import express from "express";
import { login, oauth, sign } from "../controllers/user.controller.js";

const userRoutes = express.Router()

userRoutes.post("/login", login)
userRoutes.post("/sign" , sign)
userRoutes.post("/oauth" , oauth)

export default userRoutes;