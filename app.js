const express = require("express");
const app = express();
require("dotenv").config();
const gifts = require('./routes/gifts')
const connectDB = require('./db/connect')
// middleware
 
app.use(express.json())
app.use('/api/v1/gifts', gifts)

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