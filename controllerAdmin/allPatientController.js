import {AppointmentDetails} from '../models/appointmentSchema.js';

const allPatient=async(req,res)=>{
    
    try{
        const patient = await AppointmentDetails.find({}).sort({ updatedAt: -1 });
        res.json(patient);
    }
    catch(err){
        res.send("testerrer");
    }

}

export {allPatient};