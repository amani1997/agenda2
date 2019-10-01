import dotenv from 'dotenv';
import Helper from '../helpers/helper';
import services from '../services/userService'
import 'idempotent-babel-polyfill';

dotenv.config();
class Registered { 
  create = async (req, res) => {
  const {
    firstName, lastName, email, password,
  } = req.body;
  const hashPassword = Helper.hashPassword(password);
  const values = [firstName, lastName, email, hashPassword];
  try {
    const newUser = await services.signupService(values);
    if(!newUser){
      return res.status(409).send({
        status: 409,
        error: `E-mail ${req.body.email} is alrady exist`,
      });
    }
    const token = Helper.generateToken(newUser.email);
    return res.status(201).send({
      status: 201,
      message: 'User created successfully',
      data:{
         token
      } 
    });
  } catch (error) {
    return res.status(500).send({
      error: `error accured ${error}`,
    });
  }
}
async login(req, res) {
  const {email, password} = req.body;
  try {
    const signedUser = await services.loginService(email);
    if (!signedUser) {
      return res.status(404).send({
        status: 404,
         error: `${email} does not exist in our database` 
        });
    }
      if (!Helper.comparePassword(signedUser.password, password)) {
        return res.status(400).send({ 
          status: 400,
          error: 'E-mail and password do not match' 
        });
      }
    const token = Helper.generateToken(signedUser.email);
    return res.status(200).send({
      status: 200,
       data: {
         token
       }
      });
  } catch (error) {
    return res.status(400).send({
      error: `error accured ${error}`,
    });
  }
}
}
export default new Registered();