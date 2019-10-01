import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const Helper = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  generateToken(email) {
    const token = jwt.sign({ userEmail: email,
    },
    process.env.SECRET_KEY, { expiresIn: '1d' });
    return token;
  },
};
export default Helper;