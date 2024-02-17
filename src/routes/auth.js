// user route
import { Router } from 'express';
const router = Router();
import { signup, login,getUserById,updateUserById,deleteUserById, getAllUsers } from '../controllers/authController.js';
import { authenticateToken, isAdmin } from '../middleware/authMiddleware.js';

router.post('/signup', signup);
router.post('/login', login);
router.get('/users/:id',authenticateToken, getUserById);
router.get('/users', getAllUsers);
router.put('/users/:id', authenticateToken,updateUserById);
router.delete('/users/:id',authenticateToken, isAdmin, deleteUserById);

export default router;
