import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.js';

dotenv.config();

const authenticateToken = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied. Token is missing.' });


  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token.' });
    } else {
      User.findById(user.id)
        .then((foundUser) => {
          req.user = foundUser;
          next();
        })
        .catch((error) => {
          // Handle the error, e.g., send a 500 response
          res.status(500).json({ message: 'Internal Server Error' });
        });
    }
  });
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Permission denied. Admin privileges required.' });
  }
};

export { authenticateToken, isAdmin };
