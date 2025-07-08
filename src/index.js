const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Middleware
app.use(express.json());

// DB Connection
connectDB();

// Routes
app.use('/books', bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
