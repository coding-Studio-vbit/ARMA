const tokenAuth = (req, res, next) => {
    if (!req.headers['authorization']) { return res.json({ status: process.env.FAILURE_CODE, response: "No authorization header found." }) }
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    JWT.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
      if (err) {
        return res.json({ status: process.env.FAILURE_CODE, response: "Token verification Failed." })
      }
      req.user = data
      next()
    })
  }
 
module.exports = tokenAuth