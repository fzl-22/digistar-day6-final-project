const printPretty = require("digistar-hacker-faisal");

const requestLoggingMiddleware = (req, res, next) => {
  const { method, url, body } = req;
  printPretty("info", `REQ: ${method} ${url}`, `BODY: ${body}`);
  next();
};

module.exports = requestLoggingMiddleware;
