import express from 'express';
import { Signup, Login, Logout } from '../controllers/auth.controller.js';


const authRouter = express.Router();

authRouter.post('/register', Signup);
authRouter.post('/login', Login);   
authRouter.get('/logout', Logout);

export default authRouter;
// This code defines the authentication routes for user registration, login, and logout.
