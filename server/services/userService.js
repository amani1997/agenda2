import db from '../db/users';
import 'idempotent-babel-polyfill';

const serviceData = {
  async signupService(values) {
    const text = `INSERT INTO users ( firstName, lastName, email, password)
          VALUES ($1, $2, $3, $4)
          RETURNING *`;
    try {
      const newUser = await db.execute(text, values);
      const { rows } = newUser;
      return rows[0];
    } catch (error) {
      console.log(`error accured in service ${error}`);
    }
  },
  async loginService(email) {
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.execute(text, [email]);
      return rows[0];
    } catch (error) {
      console.log(`error accured ${error}`);
    }
  }
};
export default serviceData;