import mongoose from 'mongoose';
import validator from 'validator';
import PasswordValidator from 'password-validator';
import bcrypt from 'bcryptjs'; 

// Define the password validation schema
const passwordSchema = new PasswordValidator();
passwordSchema
    .is().min(6)                            // Minimum length 6
    .is().max(100)                          // Maximum length 100
    .has().uppercase()                     // Must have uppercase letters
    .has().lowercase()                     // Must have lowercase letters
    .has().digits()                        // Must have digits
    .has().symbols()                       // Must have special characters
    .has().not().spaces()                  // Should not have spaces
    .is().not().oneOf(['Password1', 'Password123']); // Blacklist these values

const registrationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                return validator.isEmail(email);
            },
            message: 'Please enter a valid email'
        }
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function (phone) {
                return validator.isMobilePhone(phone, 'any', { strictMode: false });
            },
            message: 'Please enter a valid phone number'
        }
    },
    gender: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (password) {
                return passwordSchema.validate(password);
            },
            message: 'Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one digit, one special character, and no spaces'
        }
    },
    confirmPassword: {
        type: String,
        required: true,
    },
});

// Custom validation to check if password and confirmPassword match and hash password
registrationSchema.pre('save', function (next) {
    if (this.isModified('password') || this.isModified('confirmPassword')) {
        if (this.password !== this.confirmPassword) {
            return next(new Error('Passwords do not match'));
        }

        // Hash the password before saving
        this.password = bcrypt.hashSync(this.password, 10);
        this.confirmPassword = undefined; // Remove confirmPassword from the schema
    }
    next();
});

const Registration = mongoose.model('Registration', registrationSchema);

export { Registration };

