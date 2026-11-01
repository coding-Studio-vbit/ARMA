const authService = require("../../../services/auth/authService");
const router = require("express").Router();

const createRateLimiter = (windowMs, maxRequests, message) => {
  const requests = new Map();
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of requests.entries()) {
      if (now > data.resetTime) requests.delete(ip);
    }
  }, windowMs);
  if (timer.unref) timer.unref();

  return (req, res, next) => {
    const ip = req.ip || req.connection?.remoteAddress || "unknown";
    const now = Date.now();
    const entry = requests.get(ip);

    if (!entry || now > entry.resetTime) {
      requests.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }

    entry.count += 1;
    if (entry.count > maxRequests) {
      return res.status(429).json({
        response: message || "Too many requests. Please try again later.",
        status: 0,
      });
    }
    next();
  };
};

const loginLimiter = createRateLimiter(60 * 1000, 10, "Too many login attempts. Please try again after 1 minute.");
const forgotPasswordLimiter = createRateLimiter(15 * 60 * 1000, 5, "Too many password reset requests. Please try again later.");

router.post("/login", loginLimiter, async (req, res) => {
  const { email, password, userType, userAgent } = req.body;
  const result = await authService.login(email, password, userAgent, userType);
  res.json(result);
});

router.post("/forgotPassword", forgotPasswordLimiter, async (req, res) => {
  const { email } = req.body;
  const result = await authService.resetPasswordMail(email, res);
  res.json(result);
});

router.post("/resetPassword", async (req, res) => {
  const { email, password, token } = req.body;
  const result = await authService.resetPassword(email, password, token, res);
  res.json(result);
});

module.exports = router;
