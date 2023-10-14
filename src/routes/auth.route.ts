import { Router } from 'express';

import { signUpValidator, logInValidator } from '../middlewares/index';

import { signUp, logIn } from '../controllers/auth.controller';

const authRoute = Router();

authRoute.post('/signup', signUpValidator, signUp);
authRoute.post('/login', logInValidator, logIn);

export { authRoute };
