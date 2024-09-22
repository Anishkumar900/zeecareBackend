import { queryMessage } from '../models/messageschema.js';

const message = async (req, res) => {
    try {
        // Await the promise to get the result
        const allMessages = await queryMessage.find({}).sort({updatedAt:-1});
        res.status(200).json({allMessages})
    } catch (err) {
        // console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Internal Server Error' }); // Send an appropriate error message
    }
};

export { message };
