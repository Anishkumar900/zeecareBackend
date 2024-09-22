import mongoose from 'mongoose';
import PasswordValidator from 'password-validator';
import bcrypt from 'bcryptjs';

// Define a password schema for validation
const passwordSchema = new PasswordValidator();
passwordSchema
    .is().min(8)                              // Minimum length 8
    .is().max(20)                             // Maximum length 20
    .has().uppercase()                       // Must have uppercase letters
    .has().lowercase()                       // Must have lowercase letters
    .has().digits(1)                         // Must have at least 1 digit
    .has().not().spaces()                    // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

// Define the schema
const adminRegistrationSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
        // No password validation here, as we validate the plain text password before hashing
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
        required: true
    },
    otp: {
        type: Number,
    },
    expiresAt: {
        type: Date,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

// Pre-save hook to validate and hash password
adminRegistrationSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        // Validate plain text password
        if (!passwordSchema.validate(this.password)) {
            return next(new Error('Password does not meet the requirements'));
        }
        // Hash the password before saving
        this.password = bcrypt.hashSync(this.password, 10);
    }
    this.updated_at = Date.now(); // Update the `updated_at` field
    next();
});

// Create the model
const AdminRegistration = mongoose.model('AdminRegistration', adminRegistrationSchema);

// Export the model
export { AdminRegistration };
