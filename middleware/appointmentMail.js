import { config } from "dotenv";
import nodemailer from 'nodemailer';
config({ path: "./config/config.env" });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});

const capitalizeName = (name) => {
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

const appointmentMail = async (appointmentNumbar, email, name, phone, appointmentDate, appointmentTime, doctorName, specialty) => {
    try {
        const info = await transporter.sendMail({
            from: `"ZeeCare Appointment Team" <${process.env.USER}>`,
            to: email,
            subject: "Your Appointment with ZeeCare",
            html: htmlContent(capitalizeName(name), appointmentNumbar, phone, appointmentDate, appointmentTime, capitalizeName(doctorName), specialty),
        });

        // console.log("Message sent:", info.messageId);
    } catch (error) {
        // console.error('Error sending email:', error);
    }
}

const htmlContent = (name, appointmentNumbar, phone, appointmentDate, appointmentTime, doctorName, specialty) => `
    <html>
    <head>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                color: #333;
                background-color: #f7f7f7;
                margin: 0;
                padding: 0;
                width: 100%;
            }
            .container {
                max-width: 600px;
                margin: auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 15px rgba(0,0,0,0.2);
            }
            .header {
                background: #4CAF50;
                color: #ffffff;
                padding: 20px;
                text-align: center;
                border-radius: 10px 10px 0 0;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 700;
            }
            .content {
                padding: 20px;
                background: #f0f0f0;
                border-radius: 10px;
                margin-top: 20px;
            }
            .content p {
                margin: 0 0 15px;
                line-height: 1.6;
                font-size: 16px;
            }
            .content .highlight {
                color: #4CAF50;
                font-weight: bold;
            }
            .footer {
                font-size: 0.9em;
                color: #555;
                text-align: center;
                margin-top: 20px;
                padding-top: 10px;
                border-top: 1px solid #ddd;
            }
            .button {
                display: inline-block;
                padding: 12px 25px;
                font-size: 18px;
                color: #ffffff;
                background: #4CAF50;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
                font-weight: bold;
                text-align: center;
            }
            .button:hover {
                background: #45a049;
            }
            @media only screen and (max-width: 600px) {
                .container {
                    padding: 15px;
                }
                .header h1 {
                    font-size: 24px;
                }
                .button {
                    font-size: 16px;
                    padding: 10px 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Appointment Confirmation</h1>
            </div>
            <div class="content">
                <p>Dear <span class="highlight">${name}</span>,</p>
                <p>We are pleased to confirm your appointment with ZeeCare. Below are the details of your appointment:</p>
                <ul>
                    <li><strong>Appointment Number:</strong> ${appointmentNumbar}</li>
                    <li><strong>Date:</strong> ${appointmentDate}</li>
                    <li><strong>Time:</strong> ${appointmentTime}</li>
                    <li><strong>Doctor:</strong> ${doctorName}</li>
                    <li><strong>Specialty:</strong> ${specialty}</li>
                    <li><strong>Phone:</strong> ${phone}</li>
                </ul>
                <a href="#" class="button">View Appointment Details</a>
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

export { appointmentMail };



{/* <li><strong>Doctor:</strong> Dr. ${doctorName}</li> */}