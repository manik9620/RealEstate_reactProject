import express from "express";
import {
  loginController,
  registerController,
  storage,
} from "../controller/authController.js";
import multer from "multer";

const upload = multer({ storage: storage });
const router = express.Router();

router.post("/register", upload.single("profileImage"), registerController);
router.post("/login", loginController);

export default router;
