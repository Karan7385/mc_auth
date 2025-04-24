const authModel = require('../models/authModel');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new authModel({
            username,
            email,
            password: hashedPassword,
        });
        
        await newUser.save();

        return res.status(201).json({
            error: false,
            message: 'User registered successfully',
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: 'Server error during registration',
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await authModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                error: true,
                message: 'User not found! Please register first',
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                error: true,
                message: 'Invalid credentials',
            });
        }

        return res.status(200).json({
            error: false,
            message: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: 'Server error during login',
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await authModel.find();
        if (!users || users.length === 0) {
            return res.status(404).json({
                error: true,
                message: 'No users found',
            });
        }

        return res.status(200).json({
            error: false,
            message: 'Users retrieved successfully',
            users: users.map(user => ({
                id: user._id,
                username: user.username,
                email: user.email,
            })),
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: 'Server error while retrieving users',
        });
    }
};

module.exports = {
    register,
    login,
    getAllUsers,
};
