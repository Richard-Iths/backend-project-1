const express = require("express");
const db = require("./database/db");

const routes = require("./routes/");

require("dotenv").config();

db.sequelize.sync();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/v1", routes.userRoutes);
app.use("/api/v1", routes.generatedUserRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
