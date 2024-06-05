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
const app = (0, express_1.default)();
dotenv_1.default.config();
const initApp = () => {
    const promise = new Promise((resolve) => {
        const db = mongoose_1.default.connection;
        db.on("error", (error) => console.error(error));
        db.once("open", () => console.log("connected to mongo"));
        mongoose_1.default.connect(process.env.DATABASE_URL).then(() => {
            // express and react connection with cors
            app.use((0, cors_1.default)());
            // body parser
            app.use(body_parser_1.default.urlencoded({ extended: true, limit: "1mb" }));
            app.use(body_parser_1.default.json());
            // static files
            app.use(express_1.default.static("public"));
            // paths
            app.use("/api/auth", require("./routes/auth_route"));
            app.use("/api/gemini", gemini_route_1.default);
            // start server
            resolve(app);
        });
    });
    return promise;
};
module.exports = initApp;
//# sourceMappingURL=app.js.map