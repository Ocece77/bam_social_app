import express from "express";
import { createPost, deletePost, getPost, getPostById, putPost } from "../controllers/post.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const postRoutes =  express.Router();

postRoutes.get("/get" , getPost)
postRoutes.get("/get/:id" ,getPostById)
postRoutes.post("/create" , verifyToken , createPost)
postRoutes.put("/update" ,verifyToken,putPost)
postRoutes.delete("/delete" , verifyToken,deletePost)


export default postRoutes