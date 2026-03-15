import express from "express";
import { authMiddleWare } from "../middlewares/authMiddleware.js";
import accountController from "../controllers/accountController.js";

const accountRoutes =express.Router();
accountRoutes.get("/balance", authMiddleWare, accountController.getBalance);

export default accountRoutes