import { config } from "dotenv";
import nodemailer from 'nodemailer';
config({ path: "./config/config.env" });


const transporter = nodemailer.createTransport({
    service: 'gmail', // Corrected service name
    host: "smtp.gmail.com", // Corrected host
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.USER, // Use environment variable for email
        pass: process.env.PASS, // Use environment variable for password
    },
});

const sendMail = async (firstName, lastName, email, phone, password) => {
    // Helper function to capitalize and trim names
    const capitalizeAndTrim = str => str.trim().charAt(0).toUpperCase() + str.trim().slice(1).toLowerCase();

    // Apply the helper function
    const formattedFirstName = capitalizeAndTrim(firstName);
    const formattedLastName = capitalizeAndTrim(lastName);
    const fullName = `${formattedFirstName} ${formattedLastName}`;

    // HTML content for the email
    const htmlContent = `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    color: #333;
                    background-color: #f4f4f4;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: auto;
                    background: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                }
                .header {
                    background: #007bff;
                    color: #fff;
                    padding: 10px 0;
                    text-align: center;
                    border-radius: 8px 8px 0 0;
                }
                .content {
                    padding: 20px;
                }
                .footer {
                    font-size: 0.9em;
                    color: #555;
                    text-align: center;
                    margin-top: 20px;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    font-size: 16px;
                    color: #fff;
                    background: #28a745;
                    text-decoration: none;
                    border-radius: 5px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Welcome to ZeeCare!</h1>
                </div>
                <div class="content">
                    <p>Dear ${fullName},</p>
                    <p>Congratulations on your successful registration with ZeeCare!</p>
                    <p>Your User ID is: <strong>${email}</strong></p>
                    <p>Your Password is: <strong>${password}</strong></p>
                    <p>Your Phone Number is: <strong>${phone}</strong></p>
                    <p>Thank you for joining us!</p>
                    <a href="#" class="button">Visit ZeeCare</a>
                </div>
                <div class="footer">
                    <p>If you have any questions, feel free to contact us:</p>
                    <p>Email: <a href="mailto:anishunique900@gmail.com">anishunique900@gmail.com</a></p>
                    <p>Phone: <a href="tel:+917903461477">+91 7903461477</a></p>
                    <p>Best regards,</p>
                    <p>The ZeeCare Team</p>
                </div>
            </div>
        </body>
        </html>
    `;

    try {
        const info = await transporter.sendMail({
            from: `"ZeeCare Team" <${process.env.USER}>`, // sender address
            to: email, // list of receivers
            subject: "Welcome to ZeeCare", // Subject line
            html: htmlContent, // HTML body
        });

        console.log("Message sent:", info.messageId); // Log message ID
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export { sendMail };