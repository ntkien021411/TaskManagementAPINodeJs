const express = require("express");
const app = express();
//Body-Parser
var bodyParser = require('body-parser')
// ENV
require("dotenv").config();
const port = process.env.PORT;

//Connect database
const database = require("./config/database");
database.connect();

// parse application/json
app.use(bodyParser.json())

const routesApiVer1 = require("./api/v1/routes/index.route")
routesApiVer1(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
