module.exports = errorHandler = (err, req, res, next) => {
  if (typeof err === "string") {
    // custom
    return res.status(400).json({ message: err });
  } else if (err.name === "UnauthorizedError") {
    // jwt
    return res.status(401).json({ message: "Invalid Token" });
  } else {
    // default
    return res.status(500).json({ message: err.message });
  }
};
