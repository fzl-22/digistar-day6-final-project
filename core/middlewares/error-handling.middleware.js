const errorHandlingMiddleware = (err, req, res, next) => {
  const { status, message, data } = err;
  res.status(status || 500).json({
    message: message,
    data: data,
  });
};

module.exports = errorHandlingMiddleware;
