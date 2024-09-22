import { AppointmentDetails } from "../models/appointmentSchema.js";
// import { as } from '../models/appointmentSchema.js';
import { appointmentNumbarGenerate } from '../middleware/appointmentNumbarGenerate.js'
import {appointmentMail} from '../middleware/appointmentMail.js';

const appointment = async (req, res) => {

    const {
        email,
        name,
        phone,
        appointmentTime,
        dateOfBirth,
        gender,
        appointmentDate,
        specialty,
        doctorName,
        information
    } = req.body;


    try {
        if (!email || !name || !appointmentDate || !phone || !appointmentTime || !dateOfBirth || !doctorName || !gender || !specialty) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }

        const appointmentNumbar = appointmentNumbarGenerate();
        // console.log(appointmentNumbar);

        await AppointmentDetails.create({
            email,
            name,
            phone,
            appointmentTime,
            dateOfBirth,
            gender,
            appointmentDate,
            specialty,
            doctorName,
            information,
            appointmentNumbar
        });
        appointmentMail(appointmentNumbar,email,name,phone,appointmentDate,appointmentTime,doctorName,specialty);

        return res.status(201).json({
            success: true,
            message: "Appointment created successfully",
        });

    } catch (err) {
        // console.log("test1");
        if (err.code === 11000) { // MongoDB duplicate key error code
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }
        console.error(err.message);

        return res.status(500).json({
            success: false,
            message: "Server Error: Could not create appointment",
        });
    }
};

export { appointment };
