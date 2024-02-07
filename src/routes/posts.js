// post route
import { Router } from 'express';
const router = Router();
import { createComment, createPost, getCommentsForPost, getPosts } from '../controllers/postController.js';


router.post('/create', createPost);
router.post('/comment', createComment);
router.get('/comment/:postId', getCommentsForPost);
router.get('/', getPosts);

export default router;
