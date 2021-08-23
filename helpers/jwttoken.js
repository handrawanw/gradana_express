const jwt = require("jsonwebtoken");
const secret = "RahasiaDong!=112";

function generateToken(payload) {
  return jwt.sign(payload, secret, {expiresIn: 86400000});
}

function verifytoken(token, cb) {
  return jwt.verify(token, secret, function (err, decoded) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, decoded);
    }
  });
}

module.exports = {
  generateToken,
  verifytoken,
};
