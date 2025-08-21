import express from "express";
import { auth } from "../firebase.js";

const router = express.Router();

// Signup/Login
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await auth.createUser({ email, password });
    res.json({ uid: user.uid, email: user.email });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
