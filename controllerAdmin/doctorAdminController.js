import { doctorDetails } from '../models/adminDoctorSchema.js';


const addDoctor = async (req, res) => {
    const { doctorName, doctorDegree, doctorExperiences, specialty, aboutDoctor, phoneNumber, email } = req.body;
    // console.log(req.body);

    try {
        if (!doctorName || !doctorDegree || !doctorExperiences || !specialty || !aboutDoctor || !phoneNumber || !email) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const doctor = new doctorDetails({
            doctorName, doctorDegree, doctorExperiences, specialty, aboutDoctor, phoneNumber, email
        });
        await doctor.save();
        res.status(200).json({ message: "Doctor Added Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



const doctornumber = async (req, res) => {
    // console.log("test");
    try {
        const doctor = await doctorDetails.find({});
        res.status(200).json({ message: "Doctor Number is", doctor });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deletdoctor = async (req, res) => {
    const { _id } = req.body;
    try {
        const doctor = await doctorDetails.findByIdAndDelete(_id);
        res.status(200).json({ message: "Doctor Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}





export { addDoctor, doctornumber, deletdoctor }