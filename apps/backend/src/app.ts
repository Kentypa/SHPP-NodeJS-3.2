import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import corsOptions from "./config/cors.config";
import router from "./routes/index";
import path from "node:path";

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

export default app;
