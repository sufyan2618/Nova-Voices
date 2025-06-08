import express from 'express';
import { Signup, Login, Logout, Check_Auth } from '../controllers/auth.controller.js';
import auth from '../middlewares/auth.middleware.js';


const authRouter = express.Router();

authRouter.post('/register', Signup);
authRouter.post('/login',  Login);   
authRouter.get('/logout', auth, Logout);
authRouter.get('/check-auth', auth, Check_Auth)

export default authRouter;
