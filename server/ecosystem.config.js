module.exports = {
    apps: [{
        name: "Server",
        script: "./dist/server.js",
        env: {
            MONGODB_URI: "mongodb://root:root@localhost:27017/apidb",

            MONGODB_URI_LOCAL: "mongodb://localhost:27017/apidb",
            SESSION_SECRET: "ashdfjhasdlkjfhalksdjhflak",

            SENDGRID_USER: "myusername",
            SENDGRID_PASSWORD: "mysecurepassword",

            PORT: "8080",
            JWT_SECRET: "Jm274jkvzpMttxz395g5AhsYr7S2wtv10fJuR3t-etxen*3UGA*+NbhR+^njkX3r",
            FRONTEND_URL: "https://alex.numeriqberry.com",

        }
    }]
}