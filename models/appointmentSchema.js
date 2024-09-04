import mongoose from 'mongoose';
import validator from 'validator';


const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        // unique: true,  // Ensure email is unique
        validate: {
            validator: (v) => validator.isEmail(v),
            message: props => `${props.value} is not a valid email!`
        }
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: (v) => validator.isMobilePhone(v, 'any', { strictMode: false }),
            message: 'Please enter a valid phone number'
        }
    },
    appointmentTime: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    information: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    deleted:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


const AppointmentDetails = mongoose.model('AppointmentDetails', appointmentSchema);

export { AppointmentDetails };
