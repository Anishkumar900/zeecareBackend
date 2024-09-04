import { app } from './app.js';
import cloudinary from "cloudinary"

// import { config } from 'dotenv';
// config ({Path:'./config/config.env'});
const PORT=process.env.PORT || 4001;

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`);
    // console.log(process.env.USER);
})
