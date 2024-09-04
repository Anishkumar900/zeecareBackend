import { Registration } from '../models/regitationSchema.js';


const editProfile = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    try {
        const user = await Registration.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        return res.status(200).json({ message: 'Appointments retrieved successfully', user });
    }
    catch (err) {
        // console.log(err);
        return res.status(500).json({ message: 'Error retrieving appointments' });
    }

}

const editUpadtedProfile = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    try {
        const user = await Registration.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const updatedUser = await Registration.findByIdAndUpdate(user._id, req.body, { new: true });
        return res.status(200).json({ message: 'Profile updated successfully', updatedUser ,success: true,});
    }
    catch (err) {
        // console.log(err);
        return res.status(500).json({ message: 'Error updating profile' });
    }
}

export { editProfile, editUpadtedProfile }