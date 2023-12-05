const jwt = require('jsonwebtoken');

const secret = 'mysecret';

exports.generateToken = function(payload) {
  return jwt.sign(payload, secret);
};
