import express from "express";
import { createPost, deletePost, getPost, getPostById, updatePost ,updatePostByRemoving} from "../controllers/post.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const postRoutes =  express.Router();

postRoutes.get("/get" , getPost)
postRoutes.get("/get/:id" ,getPostById)
postRoutes.post("/create" , verifyToken , createPost)
postRoutes.put("/update/:id" ,verifyToken, updatePost)
postRoutes.put("/updateByRemoving/:id" ,verifyToken, updatePostByRemoving)
postRoutes.delete("/delete/:id" , verifyToken, deletePost)


export default postRoutes