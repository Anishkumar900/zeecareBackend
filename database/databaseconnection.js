import mongoose from "mongoose";

import { config } from "dotenv";
config({ path: "./config/config.env" });

mongoose.connect(process.env.MONGO_URL, { dbName: "DoctorManagementSystem" })
  .then(() => console.log("Database connection successful"))
  .catch((err) => console.error(`Error connecting to the database: ${err.message}`));

export { mongoose };

