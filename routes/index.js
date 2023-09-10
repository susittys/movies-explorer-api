import { Router } from 'express';
import Validator from '../common/validator.js';
import auth from '../middlewares/auth.js';
import NotFoundError from '../errors/NotFoundError.js';

import users from './users.js';
import movies from './movies.js';

import { createUser, login, logOut } from '../controllers/users.js';

const rootRouter = Router();

const { createUserValidator, loginUserValidator } = Validator();
rootRouter.post('/signup', createUserValidator, createUser);
rootRouter.post('/signin', loginUserValidator, login);
rootRouter.get('/logout', logOut);

rootRouter.use(auth);
rootRouter.use('/users', users);
rootRouter.use('/movies', movies);

rootRouter.all('*', (err, req, next) => {
  next(new NotFoundError('Ресурс по вашему запросу не найден'));
});

export default rootRouter;
