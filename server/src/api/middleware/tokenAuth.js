const jwt = require("jsonwebtoken");

const tokenAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.json({ status: Number(process.env.FAILURE_CODE || 0), response: "No authorization header found." });
  }

  const parts = authHeader.trim().split(/\s+/);
  const token = parts.length > 1 ? parts[1] : parts[0];

  if (!token) {
    return res.json({ status: Number(process.env.FAILURE_CODE || 0), response: "Invalid authorization token format." });
  }

  const jwtSecret =
    process.env.JWT_SECRET_KEY ||
    process.env.JWT_SECRET ||
    "arma_jwt_production_secret_key_vbit_2026";
  try {
    jwt.verify(token, jwtSecret, (err, data) => {
      if (err) {
        return res.json({ status: Number(process.env.FAILURE_CODE || 0), response: "Token verification Failed." });
      }
      req.user = data;
      next();
    });
  } catch (error) {
    return res.json({ status: Number(process.env.FAILURE_CODE || 0), response: "Token verification Failed." });
  }
};

module.exports = tokenAuth;
