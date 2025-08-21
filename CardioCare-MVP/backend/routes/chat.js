import express from "express";
import { chatWithGemini } from "../gemini.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message, lang, simplify } = req.body;
  try {
    const reply = await chatWithGemini(message, lang, simplify);
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
