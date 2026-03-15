import express from "express";
import authController from "../controllers/authController";
import { authMiddleWare } from "../middlewares/authMiddleware";

const router =express.Router();

