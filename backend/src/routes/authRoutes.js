import express from 'express';
import authController from '../controllers/authController.js';

let authRouter = express.Router();

authRouter.post("/login",authController.userLogin);
authRouter.post("/signup",authController.userSignup);

export default authRouter;