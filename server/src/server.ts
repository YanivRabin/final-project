import initApp from './app';
import swaggerUI from "swagger-ui-express" 
import swaggerJsDoc from "swagger-jsdoc"

initApp().then((app) => {
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
                servers: [{url: `http://localhost:${port}`,},],
            },
            apis: ["./src/routes/*.ts"],
        };
        const specs = swaggerJsDoc(options);
        app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
    }

    
    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
    });
});
