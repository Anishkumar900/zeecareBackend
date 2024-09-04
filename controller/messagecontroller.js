import { queryMessage } from "../models/messageschema.js"; 

const sendMessage = async  (req, res) => {
    const { firstname, lastname, phone, email, message } = req.body;

    if (!firstname || !lastname || !phone || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Please fill in all fields",
        });
    }


    try {
        await queryMessage.create({ firstname, lastname, phone, email, message });
        return res.status(200).json({
            success: true,
            message: "Message sent successfully!",
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: errors.join(", "),  
            });
        }
        return res.status(500).json({
            success: false,
            message: "Server Error: Could not send message",
        });
    }

};

export { sendMessage };
