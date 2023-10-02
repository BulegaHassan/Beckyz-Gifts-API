require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const authenticateUser = require('./middleware/authentication')
const giftsRouter = require("./routes/gifts");
const authRouter = require("./routes/auth");
// error handlers
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>Gifts API</h1><a href="/api/v1/gifts">gifts route</a>');
});
// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/gifts",authenticateUser, giftsRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3001;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(` DB connected and Server is running on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
