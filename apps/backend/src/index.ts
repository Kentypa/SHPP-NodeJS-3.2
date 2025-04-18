import { AppDataSource } from "./data-source";
import { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import "reflect-metadata";
import { runSeeders } from "typeorm-extension";

AppDataSource.initialize()
  .then(async () => {
    dotenv.config();

    const express = require("express");
    const app = express();

    const port = process.env.PORT || 3000;

    var cookieParser = require("cookie-parser");

    app.use(
      cors({
        origin: "http://localhost:5173",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        credentials: true,
      }),
      bodyParser.json(),
      cookieParser()
    );

    app.get("/", (req: Request, res: Response) => {
      res.send("Hello World!");
    });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
