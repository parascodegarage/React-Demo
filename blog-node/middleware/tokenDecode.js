const jwt = require('jsonwebtoken');
const secret = 'mysecret';

const tokenDecode = function(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log("these is middleware")
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, secret, function(err, payload) {
        if (err) {
          res.status(403).send(' token is nedded');
        } else {
          req.user = payload;
          
         // console.log(req.user)
          next();
        }
      });         
    } else {
      res.status(401).send('Unauthorized');
    }
  };

  module.exports={
    tokenDecode
  }