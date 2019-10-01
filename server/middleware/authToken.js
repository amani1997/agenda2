import jwt from 'jsonwebtoken';
import db from '../db/users';

const Auth = {
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if(!token) {
        return res.status(401).send({
            status: 401,
            error: 'please provide header a long with token',
          });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      const text = 'SELECT * FROM users WHERE email= $1';
      const { rows } = await db.execute(text, [decoded.userEmail]);
      if(!rows[0]) {
        return res.status(400).send({
            status: 400,
            error: 'you do not have access to this service (invalid token)',
          });
      }
      next();
    } catch(error) {
        return res.status(500).send({
            status: 500,
            error: `samething goes wrong in your token ${error}`,
          });
    }
  }
}

export default Auth;