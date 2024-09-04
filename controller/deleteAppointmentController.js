import { AppointmentDetails } from '../models/appointmentSchema.js';

const deleteAppointment = async (req, res) => {
    const { _id } = req.body;

    if (!_id) {
        return res.status(400).send({ message: "Appointment ID is required" });
    }

    try {
        // Attempt to delete the appointment
        const appointment = await AppointmentDetails.findByIdAndUpdate(
            _id,
            { deleted: true }, // Soft delete
            { new: true } // Return the updated document
        );
        // Check if the appointment was found and deleted
        if (!appointment) {
            return res.status(404).send({ message: "Appointment not found" });
        }

        // Return a success message if the appointment was deleted
        res.status(200).send({ message: "Appointment deleted successfully", appointment });
    } catch (err) {
        // Handle any errors that occur during the delete operation
        res.status(500).send({ message: "An error occurred while deleting the appointment", error: err.message });
    }
};

export { deleteAppointment };
