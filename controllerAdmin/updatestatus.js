import { AppointmentDetails } from '../models/appointmentSchema.js';


const updatestatus=async(req,res)=>{
    const {_id,status}=req.body;

    try {
        const result = await AppointmentDetails.findByIdAndUpdate(
            _id,
            { $set: { status: status } },
            { new: true } // Optionally, return the updated document
        );

        if (!result) {
            return res.status(404).send({ message: "Appointment not found" });
        }

        res.status(200).send({ message: "Appointment deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export {updatestatus}