import bcrypt from 'bcryptjs';
import { Registration } from '../models/regitationSchema.js';
import jwt from 'jsonwebtoken';

import { config } from "dotenv";
config({ path: "./config/config.env" });


const loginValidation = async (req, res) => {
    const { userName, password } = req.body;
    const email = userName;
    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }



    try {
        // Find the user by email
        const user = await Registration.findOne({ email });
        // console.log(user);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        // console.log(isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // If login is successful

        const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY,
            { expiresIn: '30d' }
        );
        // console.log(userName);

        return res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}



const authenticate = async (req, res) => {
    const { token } = req.body;  // Destructure token from req.body

    if (!token || typeof token !== 'string') {
        return res.status(401).json({ message: 'Access denied. No valid token provided.' });
    }

    try {
        // console.log("token verifeying......")
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log('Decoded token:', decoded);

        // Optionally find the user associated with the token
        const user = await Registration.findById(decoded.user._id);
        if (!user) {
            return res.status(400).json({ message: 'Invalid token. User not found.' });
        }

        // If token is valid and user is found
        return res.status(200).json({ message: 'Account verified successfully.' ,user});
    } catch (ex) {
        // Handle token verification errors
        return res.status(400).json({ message: 'Invalid token.' });
    }
};




export { loginValidation, authenticate };

