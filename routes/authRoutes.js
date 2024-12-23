import express, { Router } from "express";
import {
  loginController,
  registerController,
  testController,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

//router object
const router = express.Router();
//routing
//Register ||Method POST
router.post("/register", registerController);

//LOGIN ||Method POST
router.post("/login", loginController);

//test porteced router
router.get("/test", requireSignIn,isAdmin, testController);

export default router;
