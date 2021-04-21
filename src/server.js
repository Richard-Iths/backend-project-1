const express = require("express");
const db = require("./database/db");

require("dotenv").config();

db.sequelize.sync();

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
