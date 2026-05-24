import jwt from 'jsonwebtoken';

function getSecret() {
  return process.env.COOKIE_SECRET;
}

export function createToken(user) {
  return jwt.sign({ id: String(user._id), email: user.email }, getSecret(), {
    algorithm: 'HS256',
    expiresIn: '7d'
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, getSecret());
  } catch {
    return null;
  }
}
