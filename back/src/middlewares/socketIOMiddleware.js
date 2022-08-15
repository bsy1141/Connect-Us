const socketIOMiddleware = (req, res, next) => {
  req.io = io;
  next();
};

export { socketIOMiddleware };
