import { Registration } from '../models/regitationSchema.js';
// import fs from 'fs';
// import path from 'path';

const profilePhotoRemove = async (req, res) => {
    
    try {
        const { email } = req.body; // Get email from the request body

        // Validate the email
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Find the user by email and update the imageFile field
        const user = await Registration.findOneAndUpdate(
            { email }, // Query condition
            { imageFile: '' }, // Update operation
            { new: true } // Return the updated document
        );

        // console.log("test",user1);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile photo removed successfully' });
    } catch (error) {
        // console.error('Error removing profile photo:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



export { profilePhotoRemove };

  