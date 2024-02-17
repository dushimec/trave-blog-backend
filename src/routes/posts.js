// post route
import { Router } from "express";
const router = Router();

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
import { authenticateToken, isAdmin } from "../middleware/authMiddleware.js";

router.post("/create",authenticateToken, isAdmin, createPost);
router.post("/:postId/comments",authenticateToken, postComment);
router.put("/:postId/like",authenticateToken, likeThePost);
router.get("/", getPosts);
router.get("/:id", authenticateToken, isAdmin, getPostById); 
router.delete("/:id",authenticateToken, isAdmin,  deletePostById); 
router.put("/:id", authenticateToken, isAdmin, updatePostById); 
router.post('/posts/:postId/comments/:commentId/replies',authenticateToken, replyToComment);
router.put('/posts/:postId/comments/:commentId',authenticateToken, editComment); 
router.delete('/posts/:postId/comments/:commentId',authenticateToken, deleteComment);


export default router;
