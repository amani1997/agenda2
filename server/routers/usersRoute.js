import express from 'express';
import User from '../controllers/usersController';
import entries from '../controllers/entriesController';
import verify from '../middleware/authToken'

const {
  create, login,
} = User;

const router = express.Router();
router.post('/signup', create);
router.post('/signin', login);
router.post('/entries',verify.verifyToken, entries.fillEntries);
router.patch('/entries/:entryid',verify.verifyToken, entries.update);
router.delete('/entries/:entryid',verify.verifyToken, entries.delete);

export default router; 