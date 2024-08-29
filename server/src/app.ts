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
import next from "next";
import path from "path";

let server: any;

const dev = process.env.NODE_ENV !== "production";
console.log(path.resolve(__dirname, "../..", "client"));

const nextDir = path.join(__dirname, "../..", "client"); // Adjust path to your client directory
const nextApp = next({ dev, dir: nextDir });
const handle = nextApp.getRequestHandler();

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
      // Initialize Next.js
      nextApp.prepare().then(() => {
        // Express middleware
        app.use(cors());
        app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
        app.use(bodyParser.json());

        // API routes
        app.use("/api/auth", require("./routes/auth_route"));
        app.use("/api/gemini", geminiRoutes);

        // Swagger
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

        // Serve Next.js pages
        app.all("*", (req, res) => handle(req, res));

        // Start server
        resolve(server);
      });
    });
  });
  return promise;
};

export = initApp;
