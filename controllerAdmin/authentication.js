import { config } from "dotenv";
config({ path: "./config/config.env" });
import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';

const authentication=async(req,res)=>{
    const {token}=req.body;

    try{
        if(!token){
            return res.status(400).json({message:"Please provide a token"});
        }
        const decoded=await jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(decoded){
            return res.status(200).json({message:"User is authenticated"});
        }
        else{
            return res.status(400).json({message:"Invalid token"});
        }

    }
    catch(err){
        return res.status(500).json({ message: "Internal Server Error" });
    }


}
export {authentication}