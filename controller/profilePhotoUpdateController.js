import { Registration } from '../models/regitationSchema.js';
// import fs from 'fs';
// import path from 'path';
import express from 'express';
import fileUpload from 'express-fileupload';
import cloudinary from 'cloudinary';

const app = express();



cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET

})

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }));


  const profilePhotoUpdate = async (req, res) => {
    try {
        // Check if file is provided
        if (!req.files || !req.files.image) {
            return res.status(400).send({ message: 'No file uploaded' });
        }

        const file = req.files.image;

        // Upload the file to Cloudinary
        const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
            folder: 'zeecare/profilephoto' // Specify the folder name
        });

        // Update the user's profile with the Cloudinary URL
        const updateResult = await Registration.updateOne(
            { email: req.body.email },
            { $set: { imageFile: result.secure_url } } // Save the URL of the file
        );

        if (updateResult.nModified === 0) {
            return res.status(404).send({ message: 'User not found or image is the same' });
        }

        // Send a successful response
        res.status(200).send({ message: 'Photo uploaded and profile updated successfully', url: result.secure_url });

    } catch (error) {
        // Handle and log the error
        console.error('Error updating profile:', error);
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
};

export { profilePhotoUpdate };

