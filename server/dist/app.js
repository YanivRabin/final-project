"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const gemini_route_1 = __importDefault(require("./routes/gemini_route"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const next_1 = __importDefault(require("next"));
const path_1 = __importDefault(require("path"));
let server;
const dev = process.env.NODE_ENV !== "production";
const nextDir = path_1.default.resolve(__dirname, "../../client");
const nextApp = (0, next_1.default)({ dev, dir: nextDir });
const handle = nextApp.getRequestHandler();
const app = (0, express_1.default)();
if (process.env.NODE_ENV !== "production") {
    console.log("Development mode");
    server = http_1.default.createServer(app);
}
else {
    console.log("Production mode");
    const credentials = {
        key: fs_1.default.readFileSync("../client-key.pem"),
        cert: fs_1.default.readFileSync("../client-cert.pem"),
    };
    server = https_1.default.createServer(credentials, app);
}
dotenv_1.default.config();
const initApp = () => {
    const promise = new Promise((resolve) => {
        const db = mongoose_1.default.connection;
        db.on("error", (error) => console.error(error));
        db.once("open", () => console.log("connected to mongo"));
        const databaseUrl = process.env.DATABASE_URL;
        if (!databaseUrl) {
            throw new Error("DATABASE_URL environment variable is not defined.");
        }
        mongoose_1.default.connect(databaseUrl).then(() => {
            // Initialize Next.js
            nextApp.prepare().then(() => {
                // Express middleware
                app.use((0, cors_1.default)());
                app.use(body_parser_1.default.urlencoded({ extended: true, limit: "1mb" }));
                app.use(body_parser_1.default.json());
                // API routes
                app.use("/api/auth", require("./routes/auth_route"));
                app.use("/api/gemini", gemini_route_1.default);
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
                const specs = (0, swagger_jsdoc_1.default)(options);
                app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
                // Handle Next.js pages
                app.all("*", (req, res) => handle(req, res));
                // Start server
                resolve(server);
            });
        });
    });
    return promise;
};
module.exports = initApp;
//# sourceMappingURL=app.js.map