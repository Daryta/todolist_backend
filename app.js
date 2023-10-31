const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routers');

// Init the .env (can create a middleware for dotenv to make it accessible globally without explicity calling all over again)
require('dotenv').config();

// allow cross origin * all
const corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));

// content-type application/json
app.use(express.json());
// content-type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Api Router
app.use('/api', router);


// serving port
const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});

// Initialize database
const db = require('./db');
db.sync()
    .then(() => {
        console.log("Database synced.");
    })
    .catch((err) => {
        console.log("Failed to sync db: ", err.message);
    })



