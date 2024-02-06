// post route
import { Router } from 'express';
const router = Router();
import { createPost, getPosts } from '../controllers/postController.js';


router.post('/create', createPost);
router.get('/', getPosts);

export default router;
