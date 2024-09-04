import express from "express";
const router = express.Router();
import { sendMessage } from "../controller/messagecontroller.js"; // Import named export
import {appointment} from "../controller/appointmentController.js";
import {registerForm} from '../controller/regitationController.js';
import {loginValidation,authenticate} from '../controller/loginController.js'
import {allappointment} from '../controller/allappointmentController.js'
import {forgotPassword,verifyOtpPassword,resetPassword} from '../controller/forgotPasswordController.js';
import {editProfile,editUpadtedProfile} from '../controller/editProfileController.js';
import {deleteAppointment} from '../controller/deleteAppointmentController.js';



router.post("/querymessage", sendMessage);
router.post("/appointment",appointment);
router.post("/registetion",registerForm)
router.post("/login",loginValidation)
router.post("/authenticate",authenticate)
router.post('/allappointment',allappointment)
router.post("/forgot-password",forgotPassword)
router.post('/verify-otp',verifyOtpPassword);
router.post('/reset-password',resetPassword);
router.post('/edit-profile',editProfile);
router.post('/editUpdated-profile',editUpadtedProfile)
router.post('/deleteAppointment',deleteAppointment)



export { router };
