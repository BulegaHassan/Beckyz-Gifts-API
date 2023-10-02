/* This populates our remote-database with data from the products.json */

require("dotenv").config();

const connectDB = require("./db/connect");

const Gift = require("./models/Gift");

const jsonGifts = require("./gifts.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Gift.deleteMany();
    await Gift.create(jsonGifts);
    console.log(`Sucess!!!`);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();

// node populate.js
