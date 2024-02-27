// post route
import { Router } from "express";
const postRoutes = Router();

import {
  postComment,
  createPost,
  getPosts,
  likeThePost,
  getPostById,
  deletePostById,
  updatePostById,
  replyToComment,
  editComment,
  deleteComment,
 
} from "../controllers/postController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

postRoutes.post("/create",authenticateToken, createPost);
postRoutes.post("/:postId/comment",authenticateToken, postComment);
postRoutes.put("/:postId/like",authenticateToken, likeThePost);
postRoutes.get("/", getPosts);
postRoutes.get("/:id", authenticateToken, getPostById); 
postRoutes.delete("/:id",authenticateToken,  deletePostById); 
postRoutes.put("/:id", authenticateToken, updatePostById); 
postRoutes.post('/:postId/comments/:commentId/replies',authenticateToken, replyToComment);
postRoutes.put('/posts/:postId/comments/:commentId',authenticateToken, editComment); 
postRoutes.delete('/posts/:postId/comments/:commentId',authenticateToken, deleteComment);


export default postRoutes;
