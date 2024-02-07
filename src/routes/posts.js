// post route
import { Router } from 'express';
const router = Router();
import { postComment, createPost, getPosts, likeThePost } from '../controllers/postController.js';


router.post('/create', createPost);
router.post('/:postId/comments', postComment);
router.put('/:postId/like', likeThePost);
router.get('/', getPosts);

export default router;
