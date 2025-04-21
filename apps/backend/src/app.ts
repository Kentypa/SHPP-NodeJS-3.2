import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import corsOptions from "./config/cors.config";
import router from "./routes";

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);

export default app;
