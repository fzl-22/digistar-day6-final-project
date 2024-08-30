const printPretty = require("digistar-hacker-faisal");

const errorHandlingMiddleware = (err, req, res, next) => {
  const { status, message, data } = err;
  printPretty("error", status, message, data);
  res.status(status || 500).json({
    message: message,
    data: data,
  });
};

module.exports = errorHandlingMiddleware;
