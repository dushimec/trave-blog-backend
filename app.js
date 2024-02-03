const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const Dbconnection = require('./config/databaseConnection');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

Dbconnection()

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
