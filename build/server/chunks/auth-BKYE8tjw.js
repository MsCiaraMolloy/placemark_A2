import jwt from 'jsonwebtoken';

const SECRET = process.env.COOKIE_SECRET;
function createToken(user) {
  return jwt.sign({ id: String(user._id), email: user.email }, SECRET, {
    algorithm: "HS256",
    expiresIn: "7d"
  });
}
function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

export { createToken as c, verifyToken as v };
//# sourceMappingURL=auth-BKYE8tjw.js.map
