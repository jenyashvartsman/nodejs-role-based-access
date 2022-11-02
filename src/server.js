require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("src/helpers/error-handle");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use("/users", require("src/api/users/users.controller"));
app.use("/tickets", require("src/api/tickets/tickets.controller"));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === "production" ? 80 : 4000;
app.listen(port, function () {
  console.log("Server listening on port " + port);
});
