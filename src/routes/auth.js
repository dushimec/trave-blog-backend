// user route
import { Router } from 'express';
const router = Router();
import { signup, login,getUserById,updateUserById,deleteUserById, getAllUsers } from '../controllers/authController.js';
import { authenticateToken} from '../middleware/authMiddleware.js';

router.post('/signup', signup);
router.post('/login', login);
router.get('/users/:id',authenticateToken, getUserById);
router.get('/',authenticateToken, getAllUsers);
router.put('/users/:id', authenticateToken,updateUserById);
router.delete('/users/:id',authenticateToken, deleteUserById);

export default router;
