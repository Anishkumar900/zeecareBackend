import { app } from './app.js';
import cloudinary from "cloudinary"

// import { config } from 'dotenv';
// config ({Path:'./config/config.env'});

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

app.listen(process.env.PORT,()=>{
    console.log(`server is running ${process.env.PORT}`);
    // console.log(process.env.USER);
})
