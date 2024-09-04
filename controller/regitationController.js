import {Registration} from '../models/regitationSchema.js';
import {sendMail} from '../middleware/registationMailMiddleware.js'


const registerForm=async(req,res)=>{
    // console.log(req.body);
    const {firstName,lastName,email,phone,gender,dateOfBirth,password,confirmPassword}=req.body;


    if (!firstName || !email || !phone || !gender || !dateOfBirth || !password || !confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Please fill in all fields",
        });
    }


    try {
        await Registration.create({ firstName,lastName,email,phone,gender,dateOfBirth,password,confirmPassword});
        await sendMail(firstName,lastName,email,phone,password);
        return res.status(200).json({
            success: true,
            message: "Message sent successfully!",
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: errors.join(", "),  
            });
        }
        if (error.code === 11000) { // MongoDB unique constraint error code
            return res.status(400).json({
                success: false,
                message: "Email already registered. Please use a different email address.",
            });
        }
        return res.status(500).json({
            success: false,
            message: "Server Error: Could not send message",
        });
    }
}

export {registerForm};