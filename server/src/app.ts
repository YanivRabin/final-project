import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { Express } from "express";
import geminiRoutes from "./routes/gemini_route";
import http from "http";
import https from "https";
import fs from "fs";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

let server: any;

const app: Express = express();
if (process.env.NODE_ENV !== "production") {
  console.log("Development mode");
  server = http.createServer(app);
} else {
  console.log("Production mode");
  const credentials = {
    key: fs.readFileSync("../client-key.pem"),
    cert: fs.readFileSync("../client-cert.pem"),
  };
  server = https.createServer(credentials, app);
}

dotenv.config();

const initApp = (): Promise<http.Server> => {
  const promise = new Promise<http.Server>((resolve) => {
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
      app.use("/api/gemini", geminiRoutes);
      // swagger
      const options = {
        definition: {
          openapi: "3.0.0",
          info: {
            title: "Personal Trainer - Web dev 2024 REST API",
            version: "1.0.0",
            description: "REST server including authentication using JWT",
          },
          servers: [{ url: `http://localhost` }],
          components: {
            securitySchemes: {
              bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
        apis: ["./src/routes/*.ts"],
      };
      const specs = swaggerJsDoc(options);
      app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
      // frontend
      app.use("/assets", express.static('src/public/client/assets'));
      app.use("*", (req, res) => {
        res.sendFile('index.html', { root: 'src/public/client' });
      });
      // start server
      resolve(server);
    });
  });
  return promise;
};

export = initApp;
