require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('../routes/authRoutes');
const { connectDB } = require('../config/db');
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/v1/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})