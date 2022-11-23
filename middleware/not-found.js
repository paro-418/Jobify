const notFoundMiddleware = (req, res, next) => {
  console.log('NOT FOUND MIDDLEWARE SENT RESPONSE');
  return res.status(404).json({
    status: "not found",
    message: "Route doesn't exist",
  });
};

export default notFoundMiddleware;
