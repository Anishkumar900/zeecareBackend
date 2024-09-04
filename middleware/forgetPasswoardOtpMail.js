import nodemailer from 'nodemailer';
import { OtpPassword } from '../models/otpPasswordSchema.js';
import { config } from 'dotenv';
config ({Path:'./config/config.env'});

// Create transporter object with SMTP transport
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


// Generate OTP and expiration time
const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
    return {
        otp,
        expiresAt
    };
};

// Helper function to capitalize and trim names
const capitalizeAndTrim = (str) => {
    return str.trim().charAt(0).toUpperCase() + str.trim().slice(1).toLowerCase();
};

// Format expiration time to a readable string
const formatExpirationTime = (expiresAt) => {
    return expiresAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// HTML content for the email
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
                padding: 15px;
                text-align: center;
                border-radius: 8px 8px 0 0;
                position: relative;
                z-index: 1;
            }
            .header::before {
                content: "";
                position: absolute;
                top: 50%;
                left: -50%;
                width: 200%;
                height: 300%;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                transform: translateY(-50%);
                animation: rotateBg 30s linear infinite;
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
                margin-top: 10px;
                transition: background 0.3s ease;
            }
            .button:hover {
                background: #218838;
            }
            .highlight {
                color: #4a90e2;
                font-weight: bold;
                font-size: 24px;
                display: inline-block;
                animation: bounce 1s infinite;
            }
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: translateY(0);
                }
                40% {
                    transform: translateY(-30px);
                }
                60% {
                    transform: translateY(-15px);
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Welcome to ZeeCare!</h1>
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
                <p>Email: <a href="mailto:anishunique900@gmail.com">anishunique900@gmail.com</a></p>
                <p>Phone: <a href="tel:+917903461477">+91 7903461477</a></p>
                <p>Best regards,</p>
                <p>The ZeeCare Team</p>
            </div>
        </div>
    </body>
    </html>
`;

// Function to send the email
const sendMailForForgotPassword = async (firstName, lastName, email) => {
    // Capitalize and format the full name
    const formattedFirstName = capitalizeAndTrim(firstName);
    const formattedLastName = capitalizeAndTrim(lastName);
    const fullName = `${formattedFirstName} ${formattedLastName}`;

    // Generate OTP and expiration time
    const { otp, expiresAt } = generateOtp();

    try {
        const info = await transporter.sendMail({
            from: `"ZeeCare Team" <${process.env.USER}>`, // sender address
            to: email, // recipient address
            subject: "Your OTP for Password Change", // Subject line
            text: `Hello ${fullName},\n\nYou requested to change your password. Your OTP is ${otp}. It will expire at ${formatExpirationTime(expiresAt)}.\n\nIf you did not request this change, please ignore this email.\n\nBest regards,\nZeeCare Team`, // plain text body
            html: htmlContent(fullName, otp, expiresAt), // HTML body
        });

        const otpemail = await OtpPassword.findOne({ email });
        if (otpemail) {
            otpemail.otp = otp;
            otpemail.expiresAt = expiresAt;
            await otpemail.save();
        }
        else {
            const newOtpPassword = new OtpPassword({
                email: email,
                otp: otp,
                expiresAt: expiresAt
            });
            await newOtpPassword.save();
        }
        // console.log("Message sent:", info.messageId); // Log message ID
    } catch (error) {
        console.error('Error sending email:', error); // Log error
    }
}

export { sendMailForForgotPassword };
