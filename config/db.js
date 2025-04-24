const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

exports.connectDB = async () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

}
