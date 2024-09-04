import { Registration } from '../models/regitationSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sendMailForForgotPassword } from '../middleware/forgetPasswoardOtpMail.js';
import { OtpPassword } from '../models/otpPasswordSchema.js';
import { config } from "dotenv";
config({ path: "./config/config.env" });

const forgotPassword = async (req, res) => {
    const { username } = req.body;
    const email = username;

    if (!email) {
        return res.status(400).json({ message: "Email is required" })
    }
    try {
        const user = await Registration.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const ForgetPasswordToken = jwt.sign({ user }, process.env.JWT_SECRET_KEY,
            { expiresIn: '30m' }
        );
        await sendMailForForgotPassword(user.firstName, user.lastName, user.email);
        // console.log(user.email);
        return res.status(200).json({ message: "Password reset instructions sent to your email.", user, ForgetPasswordToken });
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error" });
    }
}

const verifyOtpPassword = async (req, res) => {
    const { otp, email, ForgetPasswordToken } = req.body;
    // console.log(req.body); // For debugging

    try {
        // Verify the JWT token
        const decoded = jwt.verify(ForgetPasswordToken, process.env.JWT_SECRET_KEY);
        const user = await Registration.findById(decoded.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find OTP record
        const otpPassword = await OtpPassword.findOne({ email, otp });

        if (!otpPassword) {
            return res.status(404).json({ message: "Invalid OTP" });
        }

        // If OTP is valid, you may want to remove it or mark it as used
        await OtpPassword.deleteOne({ email, otp });

        return res.json({ message: "OTP verified successfully" });

    } catch (error) {
        console.error(error); // Log the error
        return res.status(500).json({ message: "Server error" });
    }
}


const resetPassword = async (req, res) => {
    // console.log(req.body); // Corrected console.log
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find the user by email
        const user = await Registration.findOne({ email });

        if (user) {
            // Hash the new password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Update the user's password
            await Registration.updateOne(
                { email }, // Filter criteria
                { $set: { password: hashedPassword } } // Update operation
            );

            return res.json({ message: "Password reset successfully" });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error); // Corrected console.log
        return res.status(500).json({ message: "Server error" });
    }
};


export { forgotPassword, verifyOtpPassword, resetPassword }

