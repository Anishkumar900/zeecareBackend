import mongoose from 'mongoose';
import validator from 'validator';

const doctorSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (v) => validator.isEmail(v),
            message: props => `${props.value} is not a valid email!`
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: (v) => validator.isMobilePhone(v, 'any', { strictMode: false }),
            message: 'Please enter a valid phone number'
        }
    },
    doctorName: {
        type: String,
        required: true

    },
    doctorDegree: {
        type: Object,
        required: true
    },
    doctorExperiences: {
        type: Number,
        required: true
    },
    specialty: {
        type: Object,
        required: true
    },
    aboutDoctor: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    });

const  doctorDetails = mongoose.model('doctorDetails', doctorSchema);

export {doctorDetails};