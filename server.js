import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

import routes from "./route";

const app = express();
const port = process.env.PORT || 8081;

app.use(morgan("dev"));

// Accept encoded data as well as json format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static(__dirname + "/dist"));

app.use(routes);

app.listen(port);
console.log(`listening on port ${port}`);
module.exports = app;
