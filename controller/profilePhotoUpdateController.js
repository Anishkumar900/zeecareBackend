import { Registration } from '../models/regitationSchema.js';
import fs from 'fs';
import path from 'path';


const profilePhotoUpdate =async (req, res) => {
    // console.log(req.body); // Check if other form fields are being received
    // console.log(req.file); // This should contain the file details if upload is successful

    removePhoto(req.body.email);

    if (!req.file) {
        return res.status(400).send({ message: "No file uploaded." });
    }

    // Assuming 'imageFile' is the field name in your schema
    Registration.updateOne(
        { email: req.body.email },
        { $set: { imageFile: req.file.path } } // Save the path to the file
    )
    .then(data => {
        res.send({ message: "Profile photo updated successfully" });
    })
    .catch(error => {
        console.error(error);
        res.status(500).send({ message: "Error updating profile photo" });
    });
}

export { profilePhotoUpdate };


const removePhoto = async (email) => {
    try {
        // Find the user by email
        const user = await Registration.findOne({ email });

        // Check if user is found
        if (!user) {
            console.error('User not found');
            return;
        }

        // Get the image file path
        const imagePath = user.imageFile;
        // console.log('Image Path:', imagePath);

        if (imagePath) {
            // Define the full path to the file
            const filePath = path.join('uploads', path.basename(imagePath));
            // console.log('File Path:', filePath);

            // Remove the photo file from the uploads directory
            fs.unlink(filePath, (err) => {
                if (err) {
                    // console.error('Error deleting file:', err);
                } else {
                    // console.log('File successfully deleted.');
                }
            });
        } else {
            // console.log('No image path to remove');
        }
    } catch (error) {
        // console.error('Error:', error);
    }
};

