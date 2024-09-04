import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { mongoose } from "./database/databaseconnection.js";
import { router } from "./router/messagerouter.js";



config({ path: "./config/config.env" });

const app = express();
app.use(cors());
// app.use(cors({
//   origin: [process.env.FRONTEND_URL_PUBLIC, process.env.FRONTEND_URL_ADMIN],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// }));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
}));

app.use("/api/v1", router);


mongoose

export { app };
