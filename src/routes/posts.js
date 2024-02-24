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
import { authenticateToken } from "../middleware/authMiddleware.js";

router.post("/create",authenticateToken, createPost);
router.post("/:postId/comment",authenticateToken, postComment);
router.put("/:postId/like",authenticateToken, likeThePost);
router.get("/", getPosts);
router.get("/:id", authenticateToken, getPostById); 
router.delete("/:id",authenticateToken,  deletePostById); 
router.put("/:id", authenticateToken, updatePostById); 
router.post('/:postId/comments/:commentId/replies',authenticateToken, replyToComment);
router.put('/posts/:postId/comments/:commentId',authenticateToken, editComment); 
router.delete('/posts/:postId/comments/:commentId',authenticateToken, deleteComment);


export default router;
