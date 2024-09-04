import mongoose from 'mongoose';
import validator from 'validator';
// import PasswordValidator from 'password-validator';
// import bcrypt from 'bcryptjs'; // Correct ES module import


const otpPassword = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (email) {
                return validator.isEmail(email);
            },
            message: 'Please enter a valid email'
        }
    },
    otp: {
        type: String,
        required: true,
    },
    expiresAt:{
        type:Date,
        required:true
    }
})

const OtpPassword = mongoose.model('OtpPassword', otpPassword);
export { OtpPassword };