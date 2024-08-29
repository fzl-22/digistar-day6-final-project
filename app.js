const express = require("express");
const bodyParser = require("body-parser");

const routes = require("./routes");
const errorHandlingMiddleware = require("./core/middlewares/error-handling.middleware");
const { PORT, HOST } = require("./core/config/env");

const app = express();

app.use(bodyParser.json());

app.use(routes);

app.use(errorHandlingMiddleware);

app.listen(PORT, HOST, () => {
  console.log(
    `Server is running on http://${HOST}:${PORT}`
  );
});
