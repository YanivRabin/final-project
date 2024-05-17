import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { Express } from "express";

const app: Express = express();
dotenv.config();

const initApp = (): Promise<Express> => {
  const promise = new Promise<Express>((resolve) => {
    const db = mongoose.connection;
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("connected to mongo"));
    mongoose.connect(process.env.DATABASE_URL).then(() => {
      // express and react connection with cors
      app.use(cors());
      // body parser
      app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
      app.use(bodyParser.json());
      // static files
      app.use(express.static("public"));
      // paths
      app.use("/api/auth", require("./routes/auth_route"));
      // start server
      resolve(app);
    });
  });
  return promise;
};

export = initApp;
