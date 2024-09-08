import { app } from './app.js';


// import { config } from 'dotenv';
// config ({Path:'./config/config.env'});
const PORT=process.env.PORT || 4001;
// import fillupload from 'express-fileupload';





app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`);
    // console.log(process.env.USER);
})
