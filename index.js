const express = require("express");
const app = express();


//CORS
const cors = require('cors');
app.use(cors());

//Cookie
var cookieParser = require('cookie-parser')
// const session = require('express-session');
app.use(cookieParser("keyboard cat"));
// app.use(session({ cookie: { maxAge: 60000 } }));
//Body-Parser
var bodyParser = require('body-parser')
// parse application/json
app.use(bodyParser.json())


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
