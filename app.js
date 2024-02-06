// importind depences
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import Dbconnection from './config/databaseConnection.js';

const app = express();

const PORT = process.env.PORT || 3000;
// middleware
app.use(bodyParser.json());

// database function connection
Dbconnection()

// routers
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

// app listener
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
