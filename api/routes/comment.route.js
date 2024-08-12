import express from "express";
import { deleteComment, getCommentById, getCommentPerPost, postComment, updateComment, updateCommentByRemoving } from "../controllers/comment.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";


const commentRoutes = express.Router();

commentRoutes.get("/getCommentPerPost/:id", getCommentPerPost);
commentRoutes.get("/getCommentById/:id", getCommentById);
commentRoutes.post("/create",verifyToken, postComment);
commentRoutes.get("/remove/:id" ,verifyToken,updateCommentByRemoving);
commentRoutes.put("/update/:id",verifyToken, updateComment);
commentRoutes.delete("/delete/:id", verifyToken,deleteComment);

export default commentRoutes;


