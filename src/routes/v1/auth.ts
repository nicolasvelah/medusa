import express, { Router } from 'express';
import { verifySignUp, authJwt } from '../../middlewares';
import * as auth from '../../controllers/auth';

const router: Router = express.Router();

router.post('/signup', verifySignUp.checkDuplicateUsernameOrEmail, auth.signup);
router.post('/login', auth.login);
router.post('/token-refresh', auth.refreshToken);

export default router;
