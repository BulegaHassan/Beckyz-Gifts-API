const express = require("express");
require("express-async-errors");
const app = express();
require("dotenv").config();
const gifts = require('./routes/gifts')
const connectDB = require('./db/connect')

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
app.use(express.json())


app.get("/", (req, res) => {
  res.send('<h1>Gifts API</h1><a href="/api/v1/gifts">gifts route</a>');
});
app.use('/api/v1/gifts', gifts)

// middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = 3001;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
          console.log(` DB connected and Server is running on port: ${port}`);
        });
    } catch (error) {
        console.log(error)
    }
}
start()