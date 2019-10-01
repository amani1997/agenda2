import express from 'express';
import users from './routers/usersRoute';
import './db/users'

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.listen(port);

app.use('/api/v2/auth', users);

console.log('app running on port ', port);

export default app;