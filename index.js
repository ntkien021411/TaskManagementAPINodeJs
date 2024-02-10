const express = require("express");
const app = express();

// ENV
require("dotenv").config();
const port = process.env.PORT;

//Connect database
const database = require("./config/database");
database.connect();

const routesApiVer1 = require("./api/v1/routes/index.route")
routesApiVer1(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
