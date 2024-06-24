"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
(0, app_1.default)().then((app) => {
    const port = process.env.PORT;
    // Swagger
    if (process.env.NODE_ENV == "development") {
        const options = {
            definition: {
                openapi: "3.0.0",
                info: {
                    title: "Personal Trainer - Web dev 2024 REST API",
                    version: "1.0.0",
                    description: "REST server including authentication using JWT",
                },
                servers: [{ url: `http://localhost:${port}`, },],
            },
            apis: ["./src/routes/*.ts"],
        };
        const specs = (0, swagger_jsdoc_1.default)(options);
        app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    }
    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
    });
});
//# sourceMappingURL=server.js.map