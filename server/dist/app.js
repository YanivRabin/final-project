"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
let server;
const app = (0, express_1.default)();
dotenv_1.default.config();
const initApp = () => {
    const promise = new Promise((resolve) => {
        const db = mongoose_1.default.connection;
        db.on("error", (error) => console.error(error));
        db.once("open", () => console.log("connected to mongo"));
        mongoose_1.default.connect('mongodb://localhost:27017/final_project').then(() => {
            // express and react connection with cors
            app.use((0, cors_1.default)());
            // body parser
            app.use(body_parser_1.default.urlencoded({ extended: true, limit: "1mb" }));
            app.use(body_parser_1.default.json());
            // static files
            app.use(express_1.default.static("/server/public"));
            // paths
            app.get("/", (req, res) => {
                res.send("Hello World");
            });
            // start server
            resolve(server);
        });
    });
    return promise;
};
module.exports = initApp;
//# sourceMappingURL=app.js.map