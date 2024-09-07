import { Registration } from '../models/regitationSchema.js';
import fs from 'fs';
import path from 'path';

const profilePhotoRemove = async (req, res) => {
    
    try {
        const { email } = req.body; // Get email from the request body

        // Validate the email
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        // const user1=await Registration.findOne(email);
        removePhoto(email);

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

        // Get the current image file path
        // const imagePath = user.imageFile;
        // if (imagePath) {
        //     // Define the full path to the file
        //     const filePath = path.join('uploads', path.basename(imagePath));
        //     console.log(filePath);
        //     // Remove the photo file from the uploads directory
        //     fs.unlink(filePath, (err) => {
        //         if (err) {
        //             console.error('Error deleting file:', err);
        //         }
        //     });
        // }
        

        res.status(200).json({ message: 'Profile photo removed successfully' });
    } catch (error) {
        // console.error('Error removing profile photo:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



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
                    console.error('Error deleting file:', err);
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


export { profilePhotoRemove };

  