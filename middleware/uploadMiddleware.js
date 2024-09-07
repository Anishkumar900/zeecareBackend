import multer from 'multer';
import path from 'path';

// Configure multer to store files in the 'uploads/' directory
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Add a unique suffix to the filename to avoid name collisions
        const uniqueSuffix = Date.now() 
      cb(null, uniqueSuffix+'-'+file.originalname)
    }
});

const upload = multer({ storage });

export { upload };
