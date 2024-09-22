import express from "express";
const routerAdmin = express.Router();
import {allPatient} from '../controllerAdmin/allPatientController.js';
import {updatedelet} from '../controllerAdmin/updatedelet.js';
import {updatestatus} from '../controllerAdmin/updatestatus.js';
import {adminLogin,useradd,alluser,deletuser} from '../controllerAdmin/login.js';
import {forgetpassword,otpverification,resetpassword} from '../controllerAdmin/forgetpassword.js';
import {authentication} from '../controllerAdmin/authentication.js'
import {message} from '../controllerAdmin/messageAdminController.js'
import {addDoctor,doctornumber,deletdoctor} from '../controllerAdmin/doctorAdminController.js';


routerAdmin.get('/appointment',allPatient);
routerAdmin.post('/updatedelet',updatedelet);
routerAdmin.post('/updatestatus',updatestatus);
routerAdmin.post('/login',adminLogin);
routerAdmin.post('/forgetpassword',forgetpassword)
routerAdmin.post('/otpverification',otpverification)
routerAdmin.post('/resetpassword',resetpassword);
routerAdmin.post('/auth',authentication);
routerAdmin.post('/message',message);
routerAdmin.post('/adddoctor',addDoctor)
routerAdmin.post('/doctornumber',doctornumber)
routerAdmin.post('/deletdoctor',deletdoctor)
routerAdmin.post('/useradd',useradd);
routerAdmin.get('/alluser',alluser)
routerAdmin.post('/deletuser',deletuser)


export {routerAdmin};