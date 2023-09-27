const express = require("express");
const app = express();
require("dotenv").config();
const gifts = require('./routes/gifts')
// middleware
 
app.use(express.json())
app.use('/api/v1/gifts', gifts)

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
