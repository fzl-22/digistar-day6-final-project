const express = require("express");
const bodyParser = require("body-parser");

const routes = require("./routes");
const errorHandlingMiddleware = require("./core/middlewares/error-handling.middleware");
const { PORT, HOST } = require("./core/config/env");
const printPretty = require("digistar-hacker-faisal");
const requestLoggingMiddleware = require("./core/middlewares/request-logging.middleware");

const app = express();

app.use(bodyParser.json());

app.use(requestLoggingMiddleware);

app.use(routes);

app.use(errorHandlingMiddleware);

app.listen(PORT, HOST, () => {
  printPretty("debug", `Server is running on http://${HOST}:${PORT}`);
});
