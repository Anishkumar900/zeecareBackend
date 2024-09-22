import { AdminRegistration } from '../models/adminregitationSchema.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from "dotenv";
import { message } from './messageAdminController.js';
config({ path: "./config/config.env" });

const adminLogin = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ message: "Please enter both username and password" })
    }
    try {
        const admin = await AdminRegistration.findOne({ username: username })
        if (!admin) {
            return res.status(400).json({ message: "Invalid username" })
        }
        const isMatch = await bcrypt.compare(password, admin.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" })
        }
        const token = jwt.sign({ admin }, process.env.JWT_SECRET_KEY,
            { expiresIn: '30d' }
        );
        // console.log(userName);

        return res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ message: "Server Error" })
    }

    // try {
    //     await AdminRegistration.create({ username, password });
    //     return res.status(200).json({
    //         success: true,
    //         message: "Message sent successfully!",
    //     });

    // }
    // catch (err) {
    //     return res.status(500).json({
    //         success: false,
    //         message: "Server Error: Could not send message",
    //     });

    // }
}



const useradd = async (req, res) => {
    const { username, password, token } = req.body;
    // console.log(req.body);


    if (!username || !password || !token) {
        return res.status(400).json({
            success: false,
            message: "Invalid input data",
        });
    }


    try {
        const existingUser = await AdminRegistration.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Username already exists",
            });
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log(decoded.admin.status);

        if (decoded.admin.status === 'active') {
            await AdminRegistration.create({ username, password });
            return res.status(200).json({
                success: true,
                message: "User added successfully",
            });
        }

        return res.status(400).json({
            success: false,
            message: "User added admin only",
        });




    }
    catch (err) {
        // console.error(err.message)
        res.status(500).json({ message: "Server Error" })
    }


};

const alluser = async (req, res) => {
    try {
        const users = await AdminRegistration.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: "Server Error" })
    }
}

const deletuser = async (req, res) => {
    const { _id } = req.body;
    try {
        if (!_id) {
            res.status(400).json({ message: 'No Any Data' })
        }
        const user = await AdminRegistration.findByIdAndDelete(_id);
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server Error" })
    }
}





export { adminLogin, useradd, alluser, deletuser };