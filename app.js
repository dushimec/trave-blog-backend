// importind depences
import express from 'express';
import bodyParser from 'body-parser';
import { connectToDatabase } from './src/config/databaseConnection.js';
import paymentRouter from './src/routes/pyments.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import postRoutes from './src/routes/posts.routes.js';


const app = express();

const PORT = process.env.PORT || 3000;
// middleware
app.use(bodyParser.json());

connectToDatabase()

// routers
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/payment', paymentRouter);

// app listener
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
