import { AdminRegistration } from '../models/adminregitationSchema.js';
import { config } from "dotenv";
config({ path: "./config/config.env" });
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sendOtpToUser } from '../adminmiddleware/forgetpassword.js'

const forgetpassword = async (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ message: "username is required" })
    }
    const user = await AdminRegistration.findOne({ username });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    try {
        const ForgetPasswordToken = jwt.sign({ user }, process.env.JWT_SECRET_KEY,
            { expiresIn: '30m' }
        );
        await sendOtpToUser(username);
        //  console.log('test');
        return res.status(200).json({ message: "Password reset instructions sent to your email.", ForgetPasswordToken });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

}


const otpverification = async (req, res) => {
    const { otp, ForgetPasswordToken, username } = req.body;
    if (!otp || !ForgetPasswordToken || !username) {
        return res.status(400).json({ message: "otp,ForgetPasswordToken,username are required" })
    }
    try {
        const decoded = jwt.verify(ForgetPasswordToken, process.env.JWT_SECRET_KEY);
        const user = decoded.user;
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const otpPassword = await AdminRegistration.findOne({ username, otp });
        if (!otpPassword) {
            return res.status(404).json({ message: "Invalid OTP" });
        }
        return res.json({ message: "OTP verified successfully" });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

}


const resetpassword = async (req, res) => {
    const { password, ForgetPasswordToken, username } = req.body;
    if (!password || !ForgetPasswordToken || !username) {
        return res.status(400).json({ message: "newpassword,ForgetPasswordToken,username are required" })
    }
    
    try {
        const user = await AdminRegistration.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const decoded = jwt.verify(ForgetPasswordToken, process.env.JWT_SECRET_KEY);
        if (!decoded) {
            return res.status(404).json({ message: "Invalid token" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await AdminRegistration.updateOne(
            { username }, // Filter criteria
            { $set: { password: hashedPassword } } // Update operation
        );
        return res.json({ message: "Password reset successfully" });

    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

}





export { forgetpassword, otpverification, resetpassword };