import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Gym Booking API",
            version: "1.0.0",
            description:
                "RESTful API for managing gym class sessions and member bookings."
        },

        servers: [
            {
                url: "http://localhost:3000",
                description: "Local server"
            }
        ],

        components: {
            securitySchemes: {
                cookieAuth: {
                    type: "apiKey",
                    in: "cookie",
                    name: "token"
                }
            }
        }
    },

    apis: [
        "./src/routes/*.ts"
    ]
}

export const swaggerSpec = swaggerJsdoc(options)