const bcrypt = require('bcrypt');

exports.hashPassword = async function(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

exports.comparePassword = async function(password, hash) {
  const match = await bcrypt.compare(password, hash);
  return match;
};
