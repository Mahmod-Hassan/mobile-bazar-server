const jwt = require('jsonwebtoken');

  // verify the token whether it is valid or not
const verifyToken = (req, res, next) => {
    const {authorization} = req.headers;
    try {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.decoded = decoded;
        next();
    }
    catch {
      // when we will give inside next('somthing')
      // express will consider it as an error
      // this error will goes to our custom error handler
       res.status(403).send('forbidden access')
    }
}

module.exports = verifyToken;