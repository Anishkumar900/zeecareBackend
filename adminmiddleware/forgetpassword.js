import { AdminRegistration } from '../models/adminregitationSchema.js';
import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config({ path: './config/config.env' }); // Use lowercase 'path'

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.USER, // Use environment variable for email
        pass: process.env.PASS, // Use environment variable for password
    },
});

// Generate a 6-digit OTP and set its expiration time
const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
    return {
        otp,
        expiresAt
    };
};

// Format expiration time for better readability
const formatExpirationTime = (expiresAt) => {
    return expiresAt.toLocaleTimeString(); // Adjust format as needed
};

// Create HTML content for the email
const htmlContent = (fullName, otp, expiresAt) => `
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                color: #333;
                background-color: #f4f4f4;
                padding: 20px;
                margin: 0;
                overflow-x: hidden;
            }
            .container {
                max-width: 600px;
                margin: auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
                position: relative;
                overflow: hidden;
            }
            .header {
                background: #4a90e2;
                color: #fff;
                padding: 20px;
                text-align: center;
                border-radius: 8px 8px 0 0;
                position: relative;
                z-index: 1;
                font-size: 24px;
                font-weight: bold;
            }
            .header::before {
                content: "";
                position: absolute;
                top: 50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                transform: translateY(-50%);
                animation: rotateBg 60s linear infinite;
                z-index: -1;
            }
            @keyframes rotateBg {
                from {
                    transform: rotate(0deg);
                }
                to {
                    transform: rotate(360deg);
                }
            }
            .content {
                padding: 20px;
                line-height: 1.6;
                text-align: center;
            }
            .highlight {
                color: #4a90e2;
                font-weight: bold;
                font-size: 24px;
                display: inline-block;
                animation: bounce 1.5s infinite;
            }
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: translateY(0);
                }
                40% {
                    transform: translateY(-20px);
                }
                60% {
                    transform: translateY(-10px);
                }
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                color: #fff;
                background: #28a745;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
                transition: background 0.3s ease, transform 0.3s ease;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }
            .button:hover {
                background: #218838;
                transform: scale(1.05);
            }
            .button:active {
                transform: scale(0.98);
            }
            .footer {
                font-size: 0.9em;
                color: #555;
                text-align: center;
                margin-top: 20px;
            }
            .footer a {
                color: #4a90e2;
                text-decoration: none;
                font-weight: bold;
            }
            .footer a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                Welcome to ZeeCare!
            </div>
            <div class="content">
                <p>Hello <span class="highlight">${fullName}</span>,</p>
                <p>You requested to change your password. To complete this process, please use the following OTP:</p>
                <p class="highlight">${otp}</p>
                <p>This OTP is valid for only 15 minutes and will expire at ${formatExpirationTime(expiresAt)}.</p>
                <p>If you did not request this change, please ignore this email.</p>
                <a href="#" class="button">Complete Your Registration</a>
            </div>
            <div class="footer">
                <p>If you have any questions, feel free to contact us:</p>
                <p>Email: <a href="mailto:hit19ece.anishkumar@gmail.com">hit19ece.anishkumar@gmail.com</a></p>
                <p>Phone: <a href="tel:+917903461477">+91 7903461477</a></p>
                <p>Best regards,</p>
                <p>The ZeeCare Team</p>
            </div>
        </div>
    </body>
    </html>
`;


// Send OTP email to user
const sendOtpToUser = async (username) => {
    const { otp, expiresAt } = generateOtp();
    const fullName = "Anish Kumar"; // Ideally, this should be fetched dynamically based on the username

    try {
        const info = await transporter.sendMail({
            from: `"ZeeCare Team" <${process.env.USER}>`, // sender address
            to: "anishunique900@gmail.com", // recipient address (consider making this dynamic)
            subject: "Your OTP for Password Change", // Subject line
            text: `Hello ${fullName},\n\nYou requested to change your password. Your OTP is ${otp}. It will expire at ${formatExpirationTime(expiresAt)}.\n\nIf you did not request this change, please ignore this email.\n\nBest regards,\nZeeCare Team`, // plain text body
            html: htmlContent(fullName, otp, expiresAt), // HTML body
        });

        const otpemail = await AdminRegistration.findOne({ username });
        if (otpemail) {
            // console.log(otpemail)
            otpemail.otp = otp;
            otpemail.expiresAt = expiresAt;
            await otpemail.save();
        }
    } catch (error) {
        console.error('Error sending email:', error); // Log error
    }
}

export { sendOtpToUser };
