import mongoose from "mongoose";
import validator from "validator";

const messageschema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minLength: [3, "First Name Must Contain At Least 3 Characters!"]
    },
    lastname: {
        type: String,
        required: true,
        minLength: [3, "Last Name Must Contain At Least 3 Characters!"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Provide A Valid Email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone Number Must Contain 10 Digits!"],
        maxLength: [10, "Phone Number Must Contain 10 Digits!"]
    },
    message: {
        type: String,
        required: true,
        minLength: [3, "Message Must Contain 10 Characters!"]
    }
}, {
    timestamps: true  // This adds createdAt and updatedAt fields
});

const queryMessage = mongoose.model("queryMessage", messageschema);
export { queryMessage };
