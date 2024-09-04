import { AppointmentDetails } from '../models/appointmentSchema.js';


const allappointment = async (req, res) => {
    const { email } = req.body; // Destructure email from req.body

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        // Find all appointments based on email
        // console.log(Email)
        const allAppointments = await AppointmentDetails.find({ email: email }); // Query object for email
        // console.log(allAppointments);

        if (allAppointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found for this email' });
        }

        return res.status(200).json({ message: 'Appointments retrieved successfully', allAppointments });

    } catch (error) {
        console.error('Error during fetching appointments:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export { allappointment };
