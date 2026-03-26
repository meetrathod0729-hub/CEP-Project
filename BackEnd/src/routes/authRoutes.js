import express from "express";
import { register, login, verifyToken } from "../controllers/authController.js";

const router = express.Router();

// 🔹 REGISTER
router.post("/register", register);

// 🔹 LOGIN
router.post("/login", login);

// 🔹 PROTECTED ROUTE (test)
router.get("/me", verifyToken, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

export default router;